const API_BASE = process.env["NEXT_PUBLIC_API_URL"] ?? "https://api.postpuls.com/api/v1";
const AUTH_HINT_KEY = "postpuls_authenticated";
const ACCESS_TOKEN_KEY = "postpuls_access_token";
const ACCESS_EXPIRES_KEY = "postpuls_access_expires_at";

export type AuthResponse = {
  access_token: string;
  expires_in: number;
};

export type SessionBootstrapResponse = AuthResponse & {
  dashboard: DashboardOverview;
};

export type DraftItem = {
  id: string;
  title: string;
  status: string;
  content?: string;
};

export type DraftPageResponse = {
  items: DraftItem[];
  next_cursor: string | null;
  has_more: boolean;
};

export type DashboardOverview = {
  user_id: string;
  signals: Array<{
    id: string;
    author: string;
    post: string;
    time: string;
    posted_at?: string | null;
    likes?: number;
    replies?: number;
    reposts?: number;
    url: string;
    suggestions: string[];
  }>;
  watchlists: Array<{
    id: string;
    entry_id: string;
    name: string;
    username: string;
    avatar?: string;
    followers: string;
    following: string;
    impressions: string;
    engagement: string;
    muted?: boolean;
  }>;
  analytics: {
    summary?: {
      comments: number;
      additional_impressions: string;
      average_impressions: string;
      highest_impressions: string;
    };
    daily: Array<{ label: string; comments: number; impressions: number; followers: number }>;
    weekly: Array<{ label: string; comments: number; impressions: number; followers: number }>;
    monthly: Array<{ label: string; comments: number; impressions: number; followers: number }>;
    profiles?: Array<{
      profile: string;
      username: string;
      comments: number;
      your_impressions: string;
      average_impressions: string;
      highest_impressions: string;
      top_five_impressions: string;
    }>;
    outcomes?: Array<{
      likes: number;
      replies: number;
      profile_clicks: number;
      follows: number;
    }>;
  };
  drafts: Array<{ id: string; title: string; status: string }>;
  profiles: Array<{
    id: string;
    name: string;
    username: string;
    avatar: string;
    followers: string;
    following: string;
    owner: boolean;
  }>;
  subscription: {
    plan: string;
    price: number;
    currency: string;
    monitored_profile_limit: number;
    status: string;
  };
  transactions: Array<{ date: string; description: string; amount: number; status: string }>;
};

export type DashboardAlertsResponse = {
  items: Array<{
    post: string;
    post_time: string;
    alert_time: string;
    impressions: string;
    likes: string;
    comments: string;
    user_engagement: string;
    engagement: string;
  }>;
  total: number;
  page: number;
  per_page: number;
  pages: number;
  profile?: string;
};

export type Appointment = {
  id: string;
  name: string;
  email: string;
  scheduled_at: string;
  duration_minutes: number;
  timezone: string;
  status: string;
  created_at: string;
};

export type Asset = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  source_url?: string | null;
  asset_type?: "note" | "image" | "link";
  image_data?: string | null;
  image_url?: string | null;
};

async function request<T>(
  path: string,
  options: RequestInit = {},
  retryAfterRefresh = true,
): Promise<T> {
  if (
    accessToken &&
    accessTokenExpiresAt > 0 &&
    accessTokenExpiresAt - Date.now() < 10_000 &&
    !path.startsWith("/auth/")
  ) {
    await refresh();
  }

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });

  if (
    response.status === 401 &&
    retryAfterRefresh &&
    !path.startsWith("/auth/refresh") &&
    !path.startsWith("/auth/session") &&
    !path.startsWith("/auth/login") &&
    !path.startsWith("/auth/register") &&
    !path.startsWith("/auth/verify-otp")
  ) {
    try {
      await refresh();
      return request<T>(path, options, false);
    } catch (refreshError) {
      setAccessToken(null);
      // Best-effort server-side revocation and cookie cleanup. Do not retry
      // logout if the refresh session is already invalid.
      await request<void>("/auth/logout", { method: "POST" }, false).catch(() => undefined);
      throw refreshError;
    }
  }

  const body = (await response.json().catch(() => ({}))) as {
    detail?: string | { msg?: string }[];
  };
  if (!response.ok) {
    const detail = Array.isArray(body.detail)
      ? body.detail.map((issue) => issue.msg ?? "Invalid value").join(", ")
      : body.detail;
    throw new Error(detail ?? "Something went wrong. Please try again.");
  }
  return body as T;
}

let accessToken: string | null = null;
let accessTokenExpiresAt = 0;
let refreshPromise: Promise<AuthResponse> | null = null;

function restoreAccessTokenFromStorage() {
  if (typeof window === "undefined") return;
  try {
    const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    const expiresAt = Number(window.localStorage.getItem(ACCESS_EXPIRES_KEY) || 0);
    if (token && expiresAt > Date.now() + 10_000) {
      accessToken = token;
      accessTokenExpiresAt = expiresAt;
      return;
    }
    if (token) {
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      window.localStorage.removeItem(ACCESS_EXPIRES_KEY);
    }
  } catch {
    // Ignore storage access failures (private mode / blocked storage).
  }
}

if (typeof window !== "undefined") {
  restoreAccessTokenFromStorage();
}

export function getAccessToken() {
  return accessToken;
}

export function hasUsableAccessToken() {
  if (!accessToken && typeof window !== "undefined") {
    restoreAccessTokenFromStorage();
  }
  return Boolean(
    accessToken &&
      accessTokenExpiresAt > Date.now() + 10_000,
  );
}

export function hasAuthenticationHint() {
  if (typeof window === "undefined") return false;
  try {
    return (
      window.localStorage.getItem(AUTH_HINT_KEY) === "1" ||
      window.sessionStorage.getItem(AUTH_HINT_KEY) === "1" ||
      hasUsableAccessToken()
    );
  } catch {
    return hasUsableAccessToken();
  }
}

export async function createSessionWithDashboard() {
  const result = await request<SessionBootstrapResponse>("/auth/session", { method: "POST" });
  setAccessToken(result.access_token, result.expires_in);
  return result;
}

export function setAccessToken(token: string | null, expiresIn?: number) {
  accessToken = token;
  accessTokenExpiresAt = token && expiresIn ? Date.now() + expiresIn * 1000 : 0;
  if (typeof window !== "undefined") {
    try {
      if (token) {
        window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
        window.localStorage.setItem(ACCESS_EXPIRES_KEY, String(accessTokenExpiresAt));
        window.localStorage.setItem(AUTH_HINT_KEY, "1");
        window.sessionStorage.setItem(AUTH_HINT_KEY, "1");
      } else {
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.localStorage.removeItem(ACCESS_EXPIRES_KEY);
        window.localStorage.removeItem(AUTH_HINT_KEY);
        window.sessionStorage.removeItem(AUTH_HINT_KEY);
      }
    } catch {
      // Ignore storage access failures.
    }
    if (token) window.dispatchEvent(new Event("postpuls:auth-ready"));
  }
}

export function register(email: string, password: string) {
  return request<{ verification_required: boolean; email: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function verifyOtp(email: string, code: string) {
  const result = await request<AuthResponse>("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ email, code }),
  });
  setAccessToken(result.access_token, result.expires_in);
  return result;
}

export async function login(email: string, password: string) {
  const result = await request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setAccessToken(result.access_token, result.expires_in);
  return result;
}

export function forgotPassword(email: string) {
  return request<{ verification_required: boolean; email: string }>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(email: string, code: string, password: string) {
  return request<void>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, code, password }),
  });
}

export async function refresh() {
  if (!refreshPromise) {
    refreshPromise = request<AuthResponse>("/auth/refresh", { method: "POST" })
      .then((result) => {
        setAccessToken(result.access_token, result.expires_in);
        return result;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

export async function logout() {
  await request<void>("/auth/logout", { method: "POST" });
  setAccessToken(null);
}

export function getPendingEmail() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("postpuls_pending_email") ?? "";
}

export function setPendingEmail(email: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("postpuls_pending_email", email);
}

export function clearPendingEmail() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem("postpuls_pending_email");
}

export function getDashboardOverview() {
  return request<DashboardOverview>("/dashboard/overview");
}

export function getDashboardSignals() {
  return request<DashboardOverview["signals"]>("/dashboard/signals");
}

export type FeedOpportunity = {
  id: string;
  post_id: string;
  author_handle: string | null;
  author_name?: string | null;
  author_avatar?: string | null;
  post_text: string | null;
  post_created_at?: string | null;
  likes?: number;
  replies?: number;
  reposts?: number;
  score: number;
  score_reasons?: string[];
  match_source?: string | null;
  drafts: Array<{ text?: string; angle?: string; rank?: number; description?: string }>;
  state: string;
  scored_at: string;
  compose_url?: string | null;
};

export function getFeedOpportunities(state: "open" | "acted" | "skipped" | "expired" | "all" = "open") {
  return request<FeedOpportunity[]>(`/feed/?state=${encodeURIComponent(state)}&per_page=50`);
}

export function getDashboardWatchlists() {
  return request<DashboardOverview["watchlists"]>("/dashboard/watchlists");
}

export type AccountResponse = {
  id: string;
  handle: string;
  display_name?: string | null;
  follower_count?: number | null;
  tier: string;
  subscriber_count: number;
};

export function addWatchlistAccounts(handles: string[]) {
  return request<AccountResponse[]>("/accounts/", {
    method: "POST",
    body: JSON.stringify({ handles }),
  });
}

export function removeWatchlistAccount(accountId: string) {
  return request<void>(`/accounts/${encodeURIComponent(accountId)}`, {
    method: "DELETE",
  });
}

export function updateWatchlistEntry(entryId: string, payload: { muted?: boolean; weight?: number }) {
  return request<{
    id: string;
    account_id: string;
    account_handle: string | null;
    muted: boolean;
    weight: number;
  }>(`/watchlists/${encodeURIComponent(entryId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function getDashboardAnalytics() {
  return request<DashboardOverview["analytics"]>("/dashboard/analytics");
}

export function getDashboardDrafts() {
  return request<DashboardOverview["drafts"]>("/dashboard/drafts");
}

export function getDashboardDraftPage(cursor?: string | null, limit = 6) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", cursor);
  return request<DraftPageResponse>(`/dashboard/drafts/page?${params.toString()}`);
}

export function getDashboardDraft(draftId: string) {
  return request<DraftItem>(`/dashboard/drafts/${encodeURIComponent(draftId)}`);
}

export function updateDashboardDraft(draftId: string, draft: Pick<DraftItem, "title" | "content" | "status">) {
  return request<DraftItem>(`/dashboard/drafts/${encodeURIComponent(draftId)}`, {
    method: "PUT",
    body: JSON.stringify(draft),
  });
}

export function getDashboardProfiles() {
  return request<DashboardOverview["profiles"]>("/dashboard/profiles");
}

export function getDashboardSubscription() {
  return request<DashboardOverview["subscription"]>("/dashboard/subscription");
}

export function getDashboardTransactions() {
  return request<DashboardOverview["transactions"]>("/dashboard/transactions");
}

export function getAssets() {
  return request<Asset[]>("/product/assets");
}

export function createAsset(asset: Pick<Asset, "title" | "content" | "tags" | "asset_type" | "image_url">) {
  return request<Asset>("/product/assets", {
    method: "POST",
    body: JSON.stringify(asset),
  });
}

export type AssetUploadUrl = {
  upload_url: string;
  public_url: string;
  object_key: string;
  content_type: string;
  expires_in: number;
  max_bytes: number;
};

export function createAssetUploadUrl(payload: { content_type: string; filename?: string }) {
  return request<AssetUploadUrl>("/product/assets/upload-url", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function uploadAssetFile(file: File): Promise<string> {
  const signed = await createAssetUploadUrl({
    content_type: file.type,
    filename: file.name,
  });
  if (file.size > signed.max_bytes) {
    throw new Error(`Image must be under ${Math.round(signed.max_bytes / 1024 / 1024)}MB`);
  }
  const response = await fetch(signed.upload_url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!response.ok) {
    throw new Error("Unable to upload image to storage");
  }
  return signed.public_url;
}

export function deleteAsset(assetId: string) {
  return request<void>(`/product/assets/${encodeURIComponent(assetId)}`, { method: "DELETE" });
}

export function getDiscoverySubscriptions() {
  return request<Array<{ id: string; kind: string; value: string; reply_guy: boolean }>>(
    "/product/discovery",
  );
}

export function createAppointment(payload: {
  name: string;
  email: string;
  scheduled_at: string;
  duration_minutes?: number;
  timezone?: string;
}) {
  return request<Appointment>("/appointments/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getAppointmentAvailability(date: string) {
  return request<{ date: string; unavailable_times: string[] }>(
    `/appointments/availability?date=${encodeURIComponent(date)}`,
  );
}

export function getDashboardAlerts(profile: string, page: number, perPage = 4) {
  return request<DashboardAlertsResponse>(
    `/dashboard/alerts?profile=${encodeURIComponent(profile)}&page=${page}&per_page=${perPage}`,
  );
}

export async function getDashboardData(): Promise<DashboardOverview> {
  const [signals, watchlists, analytics, drafts, profiles, subscription, transactions] =
    await Promise.all([
      request<DashboardOverview["signals"]>("/dashboard/signals"),
      request<DashboardOverview["watchlists"]>("/dashboard/watchlists"),
      request<DashboardOverview["analytics"]>("/dashboard/analytics"),
      request<DashboardOverview["drafts"]>("/dashboard/drafts"),
      request<DashboardOverview["profiles"]>("/dashboard/profiles"),
      request<DashboardOverview["subscription"]>("/dashboard/subscription"),
      request<DashboardOverview["transactions"]>("/dashboard/transactions"),
    ]);

  return {
    user_id: "",
    signals,
    watchlists,
    analytics,
    drafts,
    profiles,
    subscription,
    transactions,
  };
}
