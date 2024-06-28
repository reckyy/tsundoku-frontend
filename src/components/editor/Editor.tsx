'use client';

import { RichTextEditor, getTaskListExtension, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import TaskItem from '@tiptap/extension-task-item';
import TipTapTaskList from '@tiptap/extension-task-list';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import rb from 'highlight.js/lib/languages/ruby';

const lowlight = createLowlight();

lowlight.register({ js, ts, rb });

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
        },
      }),
      getTaskListExtension(TipTapTaskList),
      CodeBlockLowlight.configure({ lowlight }),
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({ placeholder: 'This is placeholder' }),
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
    ],
    content: '',
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
