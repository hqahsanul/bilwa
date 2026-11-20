"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { getDashboardDraft, updateDashboardDraft } from "@/lib/auth";
import { weightedPostLength } from "@/lib/twitter-text";
import { DraftTiptapEditor } from "@/components/draft-tiptap-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DraftEditorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardDraft(id)
      .then((draft) => {
        setTitle(draft.title);
        setContent(draft.content ?? "");
        setStatus(draft.status);
      })
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : "Unable to load draft.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function saveDraft() {
    if (!title.trim() || !content.trim()) {
      setError("Add a title and draft content before saving.");
      return;
    }
    setSaving(true);
    setError("");
    setNotice("");
    try {
      await updateDashboardDraft(id, { title: title.trim(), content: content.trim(), status });
      setNotice("Draft saved");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save draft.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <main className="p-6 text-sm text-muted-foreground lg:p-10">Loading draft...</main>;
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to drafts
        </button>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Draft editor</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Edit draft</h1>
          </div>
          {notice && <p className="text-sm text-emerald-600">{notice}</p>}
        </div>

        <form
          className="mt-8 space-y-6 rounded-2xl border border-border bg-card p-4 sm:p-6 lg:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            void saveDraft();
          }}
        >
          <div>
            <label htmlFor="draft-title" className="text-sm font-medium">
              Draft title
            </label>
            <input
              id="draft-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10"
              maxLength={200}
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="draft-content" className="text-sm font-medium">
                Draft content
              </label>
              <span className="text-xs text-muted-foreground">
                {weightedPostLength(content)} / 280 weighted characters
              </span>
            </div>
            <div className="mt-2">
              <DraftTiptapEditor value={content} onChange={setContent} />
            </div>
          </div>

          <div>
            <label htmlFor="draft-status" className="text-sm font-medium">
              Status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="draft-status" className="mt-2 h-11 w-full bg-background sm:max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">In review</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <p className="rounded-lg bg-destructive/5 px-3 py-2 text-sm text-destructive">{error}</p>}

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => router.back()} className="rounded-lg px-4 py-2.5 text-sm hover:bg-muted">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm text-background hover:opacity-90 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save draft"}
            </button>
            <a
              href={`https://x.com/intent/post?text=${encodeURIComponent(content)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm hover:bg-muted"
            >
              Open in X
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
