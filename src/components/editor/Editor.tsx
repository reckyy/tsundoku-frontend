import { RichTextEditor, getTaskListExtension, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import TaskItem from '@tiptap/extension-task-item';
import TipTapTaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import rb from 'highlight.js/lib/languages/ruby';
import { Button, Grid, GridCol, TextInput, Text } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { Heading } from '@/types/index';
import classes from './Editor.module.css';

type EditorProps = {
  heading: Heading | undefined;
  handleSaveAll: (
    title: string,
    headingId: number,
    content: string,
    memoId: number,
  ) => Promise<boolean>;
};

const lowlight = createLowlight();
lowlight.register({ js, ts, rb });

export default function Editor({ heading, handleSaveAll }: EditorProps) {
  const memoBody = heading?.memo.body ?? '';
  const title = heading?.title ?? '';
  const [saved, setSaved] = useState({ title, body: memoBody });
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftBody, setDraftBody] = useState(memoBody);
  const [isSaving, setIsSaving] = useState(false);
  const previousHeadingId = useRef(heading?.id);
  const activeHeadingId = useRef(heading?.id);
  activeHeadingId.current = heading?.id;

  const isTitleDirty = draftTitle !== saved.title;
  const isBodyDirty = draftBody !== saved.body;
  const canSave =
    (isTitleDirty || isBodyDirty) && Boolean(heading) && !isSaving;

  const memoPlaceholder = `1. 1章 - プログラミングの基礎概念
- プログラミングは、問題解決のための手順を記述する行為である。
- アルゴリズムとデータ構造の基礎について学ぶ。

2. 2章 - 変数とデータ型
- 変数はデータを格納するための名前付きの場所であり、数値・文字列などのデータ型がある。
- メモリの管理や効率的なデータ処理の重要性を理解。

3. 3章 - 条件分岐とループ
- 条件分岐（if文）やループ（for文、while文）によりプログラムの流れを制御。
- 複雑なロジックを構築するための基礎を学ぶ。
`;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      getTaskListExtension(TipTapTaskList),
      CodeBlockLowlight.configure({ lowlight }),
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({ placeholder: memoPlaceholder }),
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
      TextStyle,
      Color,
    ],
    autofocus: true,
    content: memoBody,
    onCreate: ({ editor }) => {
      const content = editor.getHTML();
      setDraftBody(content);
      setSaved((current) => ({ ...current, body: content }));
    },
    onUpdate: ({ editor }) => {
      setDraftBody(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor || heading?.id === previousHeadingId.current) return;

    previousHeadingId.current = heading?.id;
    editor.commands.setContent(memoBody);
    const content = editor.getHTML();

    setDraftTitle(title);
    setDraftBody(content);
    setSaved({ title, body: content });
  }, [editor, heading, memoBody, title]);

  const handleSaveClick = async () => {
    const memoId = heading?.memo.id;
    const headingId = heading?.id;

    if (memoId === undefined || headingId === undefined) return;

    const titleToSave = draftTitle;
    const bodyToSave = draftBody;
    setIsSaving(true);
    try {
      const succeeded = await handleSaveAll(
        titleToSave,
        headingId,
        bodyToSave,
        memoId,
      );
      if (succeeded && activeHeadingId.current === headingId) {
        setSaved({ title: titleToSave, body: bodyToSave });
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Text fw="700">タイトル</Text>
      <Grid align="center">
        <GridCol span={9}>
          <TextInput
            aria-label="heading-title"
            variant="unstyled"
            size="lg"
            value={draftTitle}
            placeholder="第1章 : プログラミングの基礎概念"
            styles={{
              input: {
                color: '#37352f',
              },
            }}
            onChange={(event) => setDraftTitle(event.currentTarget.value)}
          />
        </GridCol>
        <GridCol offset={1} span={2}>
          <Button
            mt="2"
            variant="light"
            color="blue"
            onClick={handleSaveClick}
            fullWidth
            disabled={!canSave}
          >
            保存
          </Button>
        </GridCol>
      </Grid>
      <Grid>
        <GridCol span={12}>
          <Text fw="700" mt="md">
            この章のメモ
          </Text>
        </GridCol>
        <GridCol span={12}>
          <RichTextEditor editor={editor} className={classes.customEditor}>
            <RichTextEditor.Content />
          </RichTextEditor>
        </GridCol>
      </Grid>
    </>
  );
}
