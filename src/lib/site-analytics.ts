const API_BASE = process.env["NEXT_PUBLIC_API_URL"] ?? "https://api.postpuls.com/api/v1";
const SESSION_KEY = "postpuls_site_session";

type SiteEvent = {
  event_name: string;
  path?: string;
  target?: string;
  location?: string;
};

function sessionId() {
  if (typeof window === "undefined") return "";
  let id = window.sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function trackSiteEvent(event: SiteEvent) {
  if (typeof window === "undefined") return;
  const payload = {
    ...event,
    path: event.path ?? window.location.pathname,
    referrer: document.referrer || null,
    source: new URLSearchParams(window.location.search).get("utm_source") ?? "direct",
    device: window.matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop",
    session_id: sessionId(),
  };
  void fetch(`${API_BASE}/analytics/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);
}
