"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CircleUserRound,
  CreditCard,
  Download,
  ArrowLeft,
  HelpCircle,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  Radar,
  Receipt,
  Settings,
  SlidersHorizontal,
  Plus,
  Trash2,
  Upload,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  createAsset,
  deleteAsset,
  getAssets,
  logout,
  uploadAssetFile,
  type Asset,
} from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;
const MAX_BYTES = 4 * 1024 * 1024;

const TILE_ASPECTS = [
  "aspect-square",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[16/10]",
  "aspect-[5/4]",
  "aspect-[3/5]",
] as const;

const SIDEBAR_ITEMS: Array<{ label: string; icon: LucideIcon; href: string }> = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Command Radar", icon: Radar, href: "/dashboard/command-radar" },
  { label: "Watchlists", icon: Users, href: "/dashboard/watchlists" },
  { label: "Visibility", icon: BarChart3, href: "/dashboard/visibility" },
  { label: "Draft angles", icon: SlidersHorizontal, href: "/dashboard/draft-angles" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  { label: "Subscription", icon: CreditCard, href: "/dashboard/subscription" },
  { label: "Transactions", icon: Receipt, href: "/dashboard/transactions" },
];

function pageWindow(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: Array<number | "ellipsis"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("ellipsis");
  for (let p = start; p <= end; p += 1) pages.push(p);
  if (end < total - 1) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

export function AssetLibraryPage() {
  const router = useRouter();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [listError, setListError] = useState("");

  useEffect(() => {
    getAssets()
      .then((items) => {
        setAssets(items);
        setListError("");
      })
      .catch((cause: unknown) => {
        setListError(cause instanceof Error ? cause.message : "Unable to load assets.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const totalPages = Math.max(1, Math.ceil(assets.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return assets.slice(start, start + PAGE_SIZE);
  }, [assets, page]);

  function resetForm() {
    setTitle("");
    setTags("");
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError("");
  }

  function openDialog() {
    resetForm();
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    resetForm();
  }

  function handleFiles(files: FileList | null) {
    if (!files?.[0]) return;
    const next = files[0];
    if (!next.type.startsWith("image/")) {
      setError("Use JPG, PNG, WEBP, or GIF.");
      return;
    }
    if (next.size > MAX_BYTES) {
      setError("Image must be under 4MB.");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(next);
    setPreviewUrl(URL.createObjectURL(next));
    setError("");
  }

  async function saveAsset() {
    if (!title.trim()) {
      setError("Add an asset name before continuing.");
      return;
    }
    if (!file) {
      setError("Upload an image before continuing.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const imageUrl = await uploadAssetFile(file);
      const tagList = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      const asset = await createAsset({
        title: title.trim(),
        content: title.trim(),
        tags: tagList,
        asset_type: "image",
        image_url: imageUrl,
      });
      setAssets((current) => [asset, ...current]);
      setPage(1);
      closeDialog();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to save asset.");
    } finally {
      setSaving(false);
    }
  }

  async function removeAsset(assetId: string) {
    await deleteAsset(assetId);
    setAssets((current) => current.filter((asset) => asset.id !== assetId));
  }

  const pages = pageWindow(page, totalPages);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside
        onMouseEnter={() => setSidebarCollapsed(false)}
        onMouseLeave={() => setSidebarCollapsed(true)}
        className={cn(
          "fixed inset-y-0 left-0 z-20 hidden border-r border-border bg-card px-4 py-6 transition-[width] duration-200 lg:block",
          sidebarCollapsed ? "w-20" : "w-60",
        )}
      >
        <div className={cn("flex items-center", sidebarCollapsed ? "justify-center" : "justify-between")}>
          <Link href="/" className="flex items-center gap-2 px-3 text-lg font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-xs text-background">
              P
            </span>
            {!sidebarCollapsed && "PostPuls"}
          </Link>
        </div>
        <nav className="mt-10 space-y-1">
          {SIDEBAR_ITEMS.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              title={sidebarCollapsed ? label : undefined}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                sidebarCollapsed && "justify-center px-2",
              )}
            >
              <Icon className="h-4 w-4" />
              {!sidebarCollapsed && label}
            </Link>
          ))}
          <Link
            href="/dashboard/assets"
            title={sidebarCollapsed ? "Assets" : undefined}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg bg-foreground px-3 py-2.5 text-sm text-background",
              sidebarCollapsed && "justify-center px-2",
            )}
          >
            <Download className="h-4 w-4" />
            {!sidebarCollapsed && "Assets"}
          </Link>
        </nav>
        <div className="absolute bottom-6 left-4 right-4 flex flex-col gap-2">
          <button
            type="button"
            title={sidebarCollapsed ? "Log out" : undefined}
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
              sidebarCollapsed && "justify-center px-2",
            )}
          >
            <LogOut className="h-4 w-4" />
            {!sidebarCollapsed && "Log out"}
          </button>
          <Link
            href="/dashboard/profile"
            title={sidebarCollapsed ? "Profile" : undefined}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
              sidebarCollapsed && "justify-center px-2",
            )}
          >
            <CircleUserRound className="h-4 w-4" />
            {!sidebarCollapsed && "Profile"}
          </Link>
        </div>
      </aside>

      <main className={cn("min-w-0 transition-[padding] duration-200", sidebarCollapsed ? "lg:pl-20" : "lg:pl-60")}>
        <header className="flex h-16 items-center justify-between gap-3 border-b border-border px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              aria-label="Back to Dashboard"
              className="rounded-lg p-2 hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <p className="text-xs text-muted-foreground">Workspace</p>
              <h1 className="font-semibold">Assets gallery</h1>
            </div>
          </div>
          <Button type="button" onClick={openDialog} className="gap-2">
            <Plus className="h-4 w-4" />
            Add asset
          </Button>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Your proof library</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Drag and explore your curated collection of shots, stories, and results.
              </p>
            </div>
            <p className="text-xs text-muted-foreground">{assets.length} assets</p>
          </div>

          {listError && <p className="mb-4 text-sm text-destructive">{listError}</p>}

          {loading ? (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "mb-4 animate-pulse break-inside-avoid rounded-2xl bg-muted",
                    TILE_ASPECTS[index % TILE_ASPECTS.length],
                  )}
                />
              ))}
            </div>
          ) : assets.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted">
                <ImagePlus className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No assets yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your first image to start building replies from your own proof.
              </p>
              <Button type="button" onClick={openDialog} className="mt-6 gap-2">
                <Plus className="h-4 w-4" />
                Add asset
              </Button>
            </div>
          ) : (
            <>
              <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                {pageItems.map((asset, index) => {
                  const imageSrc = asset.image_url || asset.image_data;
                  const subtitle =
                    asset.tags?.[0] ||
                    (asset.content && asset.content !== asset.title
                      ? asset.content
                      : "Personal asset");
                  return (
                    <article
                      key={asset.id}
                      className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-muted"
                    >
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={asset.title}
                          className={cn(
                            "w-full object-cover transition duration-300 group-hover:scale-[1.02]",
                            TILE_ASPECTS[index % TILE_ASPECTS.length],
                          )}
                        />
                      ) : (
                        <div
                          className={cn(
                            "flex w-full items-end bg-gradient-to-br from-muted to-muted-foreground/20 p-4",
                            TILE_ASPECTS[index % TILE_ASPECTS.length],
                          )}
                        >
                          <div>
                            <p className="font-medium">{asset.title}</p>
                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                              {asset.content}
                            </p>
                          </div>
                        </div>
                      )}

                      {imageSrc && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-4 pt-16 opacity-0 transition group-hover:opacity-100">
                          <p className="text-sm font-semibold text-white">{asset.title}</p>
                          <p className="mt-0.5 line-clamp-2 text-xs text-white/80">{subtitle}</p>
                        </div>
                      )}

                      <button
                        type="button"
                        aria-label={`Delete ${asset.title}`}
                        onClick={() => void removeAsset(asset.id)}
                        className="absolute right-3 top-3 rounded-full bg-black/55 p-2 text-white opacity-0 transition group-hover:opacity-100 hover:bg-black/75"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </article>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <Pagination className="mt-10">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        aria-disabled={page === 1}
                        className={cn(page === 1 && "pointer-events-none opacity-40")}
                        onClick={(event) => {
                          event.preventDefault();
                          setPage((current) => Math.max(1, current - 1));
                        }}
                      />
                    </PaginationItem>
                    {pages.map((item, index) =>
                      item === "ellipsis" ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={item}>
                          <PaginationLink
                            href="#"
                            isActive={item === page}
                            onClick={(event) => {
                              event.preventDefault();
                              setPage(item);
                            }}
                          >
                            {item}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        aria-disabled={page === totalPages}
                        className={cn(page === totalPages && "pointer-events-none opacity-40")}
                        onClick={(event) => {
                          event.preventDefault();
                          setPage((current) => Math.min(totalPages, current + 1));
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </main>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) closeDialog();
          else setDialogOpen(true);
        }}
      >
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[540px]">
          <div className="px-6 pb-2 pt-6">
            <DialogHeader className="space-y-2 text-left">
              <DialogTitle className="text-2xl font-semibold tracking-tight">
                Add a new asset
              </DialogTitle>
              <DialogDescription>
                Drag and drop an image to add proof you can reuse in replies.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="asset-name">Asset name</Label>
                <Input
                  id="asset-name"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Product screenshot"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="asset-tags">Tags</Label>
                <Input
                  id="asset-tags"
                  value={tags}
                  onChange={(event) => setTags(event.target.value)}
                  placeholder="growth, case study"
                />
              </div>
            </div>

            <label
              className={cn(
                "mt-5 flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border px-4 py-8 text-center transition hover:bg-muted/50",
                file && "border-solid bg-muted/30",
              )}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                handleFiles(event.dataTransfer.files);
              }}
            >
              {previewUrl ? (
                <div className="flex w-full flex-col items-center gap-3">
                  <img
                    src={previewUrl}
                    alt="Upload preview"
                    className="h-28 w-auto max-w-full rounded-lg object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{file?.name}</p>
                    <p className="text-muted-foreground">
                      {file ? `${Math.round(file.size / 1024)} KB · click to replace` : ""}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <span className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-muted">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </span>
                  <span className="text-sm font-medium text-foreground">Upload an asset image</span>
                  <span className="mt-1 text-sm text-muted-foreground">
                    or, click to browse (4MB max)
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={(event) => handleFiles(event.target.files)}
              />
            </label>

            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          </div>

          <DialogFooter className="mt-6 flex-row items-center justify-between gap-3 border-t border-border bg-muted/20 px-6 py-4 sm:justify-between">
            <a
              href="mailto:support@postpuls.com"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <HelpCircle className="h-4 w-4" />
              Need help?
            </a>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={closeDialog} disabled={saving}>
                Cancel
              </Button>
              <Button type="button" onClick={() => void saveAsset()} disabled={saving}>
                {saving ? "Uploading..." : "Continue"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
