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
import { Button, Grid, GridCol, TextInput } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { EditorProps } from '@/types/index';
import classes from './Editor.module.css';

const lowlight = createLowlight();

lowlight.register({ js, ts, rb });

export default function Editor({ heading, handleSave }: EditorProps) {
  const memoBody = heading?.memo.body ?? '';
  const title = heading?.title ?? '';

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      getTaskListExtension(TipTapTaskList),
      CodeBlockLowlight.configure({ lowlight }),
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({ placeholder: 'メモを書く' }),
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
    ],
    autofocus: true,
    content: memoBody,
  });

  const [headingTitle, setHeadingTitle] = useState<string>(title);
  const prevHeading = useRef(heading);

  useEffect(() => {
    if (editor && heading !== prevHeading.current) {
      editor?.commands.setContent(memoBody);
      prevHeading.current = heading;
      setHeadingTitle(title);
    }
  }, [editor, heading, memoBody, title]);

  const handleSaveClick = async () => {
    const content = editor?.getHTML() ?? '';
    const title = headingTitle ?? '';
    await handleSave(content, title);
  };

  return (
    <>
      <Grid>
        <GridCol span={9}>
          <TextInput
            variant="unstyled"
            aria-label="heading-title"
            size="xl"
            value={headingTitle}
            placeholder="章のタイトルを書く"
            onChange={(event) => setHeadingTitle(event.currentTarget.value)}
          />
        </GridCol>
        <GridCol span={3}>
          <Button variant="light" color="green" onClick={handleSaveClick}>
            保存
          </Button>
        </GridCol>
      </Grid>
      <Grid>
        <GridCol span={12}>
          <RichTextEditor editor={editor} className={classes.customEditor}>
            <RichTextEditor.Content />
          </RichTextEditor>
        </GridCol>
      </Grid>
    </>
  );
}
