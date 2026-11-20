"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PenLine } from "lucide-react";
import {
  getDashboardDraftPage,
  type DraftItem,
  type DraftPageResponse,
} from "@/lib/auth";

const PAGE_SIZE = 6;

export function DraftsPanel() {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pages, setPages] = useState<DraftPageResponse[]>([]);
  const [mobileItems, setMobileItems] = useState<DraftItem[]>([]);
  const [mobileCursor, setMobileCursor] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getDashboardDraftPage(null, PAGE_SIZE)
      .then((response) => {
        if (!active) return;
        setPages([response]);
        setMobileItems(response.items);
        setMobileCursor(response.next_cursor);
      })
      .catch((requestError) => {
        if (active) setError(requestError instanceof Error ? requestError.message : "Unable to load drafts.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !mobileCursor || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !loadingMore) {
          setLoadingMore(true);
          getDashboardDraftPage(mobileCursor, PAGE_SIZE)
            .then((response) => {
              setMobileItems((current) => [...current, ...response.items]);
              setMobileCursor(response.next_cursor);
            })
            .catch((requestError) => {
              setError(requestError instanceof Error ? requestError.message : "Unable to load more drafts.");
            })
            .finally(() => setLoadingMore(false));
        }
      },
      { rootMargin: "240px" },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isMobile, mobileCursor, loadingMore]);

  const currentPage = pages[pageIndex];
  const desktopItems = currentPage?.items ?? [];
  const items = isMobile ? mobileItems : desktopItems;

  async function goToNextPage() {
    if (!currentPage?.next_cursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const response = await getDashboardDraftPage(currentPage.next_cursor, PAGE_SIZE);
      setPages((current) => [...current, response]);
      setPageIndex((current) => current + 1);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to load drafts.");
    } finally {
      setLoadingMore(false);
    }
  }

  if (error) {
    return <p className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</p>;
  }

  return (
    <div className="mt-8">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="hidden grid-cols-[84px_minmax(0,1fr)_120px] gap-4 border-b border-border px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:grid">
          <span>Draft</span>
          <span>Angle</span>
          <span className="text-right">Action</span>
        </div>
        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading drafts...</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">No drafts yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {items.map((draft, index) => (
              <div key={draft.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 px-4 py-4 sm:grid-cols-[84px_minmax(0,1fr)_120px] sm:gap-4 sm:px-5">
                <p className="hidden text-xs text-muted-foreground sm:block">Draft {String(index + 1).padStart(2, "0")}</p>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground sm:hidden">Draft {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-medium sm:truncate">{draft.title}</h3>
                </div>
                <button
                  type="button"
                  aria-label={`Edit ${draft.title}`}
                  title="Edit draft"
                  onClick={() => router.push(`/dashboard/drafts/${draft.id}`)}
                  className="col-start-2 row-start-1 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:col-auto sm:row-auto sm:ml-auto sm:w-auto sm:gap-2 sm:border sm:border-border sm:px-3"
                >
                  <PenLine className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isMobile ? (
        <div ref={loadMoreRef} className="flex min-h-14 items-center justify-center py-4 text-xs text-muted-foreground">
          {loadingMore ? "Loading more drafts..." : mobileCursor ? "Scroll to load more" : "All drafts loaded"}
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            disabled={pageIndex === 0 || loadingMore}
            onClick={() => setPageIndex((current) => Math.max(0, current - 1))}
            className="rounded-lg border border-border px-3 py-2 text-xs hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          >
            Previous
          </button>
          <span className="px-2 text-xs text-muted-foreground">
            Page {pageIndex + 1}
          </span>
          <button
            type="button"
            disabled={!currentPage?.next_cursor || loadingMore}
            onClick={goToNextPage}
            className="rounded-lg border border-border px-3 py-2 text-xs hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          >
            {loadingMore ? "Loading..." : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
