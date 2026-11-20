"use client";

import { useEffect } from "react";
import { getAccessToken, hasAuthenticationHint } from "@/lib/auth";

const API_BASE =
  process.env["NEXT_PUBLIC_API_URL"] ?? "https://api.postpuls.com/api/v1";

function decodeVapidKey(value: string) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  return Uint8Array.from(raw, (character) => character.charCodeAt(0));
}

async function ensureServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service workers are not supported in this browser.");
  }
  return navigator.serviceWorker.register("/sw.js");
}

export async function syncPushSubscription() {
  if (
    !hasAuthenticationHint() ||
    !getAccessToken() ||
    !("Notification" in window) ||
    Notification.permission !== "granted" ||
    !("PushManager" in window)
  ) {
    return false;
  }

  await ensureServiceWorker();
  const registration = await navigator.serviceWorker.ready;
  const keyResponse = await fetch(`${API_BASE}/notifications/push/public-key`);
  if (!keyResponse.ok) {
    throw new Error("Browser notifications are not configured on the server.");
  }
  const { public_key: publicKey } = (await keyResponse.json()) as {
    public_key: string;
  };
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: decodeVapidKey(publicKey),
  });
  const response = await fetch(`${API_BASE}/notifications/push/subscriptions`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      ...subscription.toJSON(),
      user_agent: navigator.userAgent,
    }),
  });
  if (!response.ok) {
    throw new Error("Unable to save the browser push subscription.");
  }
  return true;
}

export async function enableBrowserPushNotifications() {
  if (!("Notification" in window) || !("PushManager" in window)) {
    throw new Error("Browser push notifications are not supported here.");
  }
  const permission =
    Notification.permission === "granted"
      ? "granted"
      : await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission was denied.");
  }
  await syncPushSubscription();
  return true;
}

export async function disableBrowserPushNotifications() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) return;
  const token = getAccessToken();
  if (token) {
    await fetch(`${API_BASE}/notifications/push/subscriptions`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...subscription.toJSON(),
        user_agent: navigator.userAgent,
      }),
    }).catch(() => undefined);
  }
  await subscription.unsubscribe();
}

export function isBrowserPushEnabled() {
  return (
    typeof window !== "undefined" &&
    "Notification" in window &&
    Notification.permission === "granted"
  );
}

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    void ensureServiceWorker().catch((error: unknown) => {
      console.warn("PostPuls service worker registration failed", error);
    });

    const handleAuthReady = () => {
      void syncPushSubscription().catch((error: unknown) => {
        console.warn("PostPuls push subscription sync failed", error);
      });
    };
    handleAuthReady();
    window.addEventListener("postpuls:auth-ready", handleAuthReady);
    return () => window.removeEventListener("postpuls:auth-ready", handleAuthReady);
  }, []);

  return null;
}
