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
import { Button } from '@mantine/core';
import { useEffect, useRef } from 'react';

const lowlight = createLowlight();

lowlight.register({ js, ts, rb });

type EditorProps = {
  memoBody: string | undefined;
};

export function Editor({ memoBody }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
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
    content: memoBody,
  });

  const prevMemoBody = useRef(memoBody);

  useEffect(() => {
    if (editor && memoBody !== prevMemoBody.current) {
      editor.commands.setContent(memoBody ?? '');
      prevMemoBody.current = memoBody;
    }
  }, [editor, memoBody]);


  return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Content />
      </RichTextEditor>
      <Button variant="light" color="green">
        保存
      </Button>
    </>
  );
}
