"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

type DraftTiptapEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DraftTiptapEditor({ value, onChange }: DraftTiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
      }),
      Placeholder.configure({ placeholder: "Write your reply..." }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-64 w-full rounded-xl border border-border bg-background p-4 text-sm leading-6 outline-none",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getText({ blockSeparator: "\n" }));
    },
  });

  useEffect(() => {
    if (!editor || editor.getText({ blockSeparator: "\n" }) === value) return;
    editor.commands.setContent(value);
  }, [editor, value]);

  return <EditorContent editor={editor} />;
}
