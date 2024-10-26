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
  handleSave: (content: string, title: string) => void;
};

const lowlight = createLowlight();

lowlight.register({ js, ts, rb });

export default function Editor({ heading, handleSave }: EditorProps) {
  const memoBody = heading?.memo.body ?? '';
  const title = heading?.title ?? '';
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
  });

  editor?.commands.setColor('#37352f');

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
          <Text fw="700">タイトル</Text>
          <TextInput
            variant="unstyled"
            aria-label="heading-title"
            size="lg"
            value={headingTitle}
            placeholder="第1章 : プログラミングの基礎概念"
            styles={{
              input: {
                color: '#37352f',
              },
            }}
            onChange={(event) => setHeadingTitle(event.currentTarget.value)}
          />
        </GridCol>
        <GridCol offset={1} span={2}>
          <Button
            variant="light"
            fullWidth
            color="green"
            onClick={handleSaveClick}
          >
            保存
          </Button>
        </GridCol>
      </Grid>
      <Grid>
        <GridCol span={12}>
          <Text fw="700">この章のメモ</Text>
          <RichTextEditor editor={editor} className={classes.customEditor}>
            <RichTextEditor.Content />
          </RichTextEditor>
        </GridCol>
      </Grid>
    </>
  );
}
