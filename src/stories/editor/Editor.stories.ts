import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor, fn } from '@storybook/test';
import Editor from '@/components/editor/Editor';
import { Heading } from '@/types/index';

const heading: Heading = {
  id: 1,
  number: 1,
  title: '第1章',
  memo: {
    id: 1,
    body: '<p>プログラミングの基礎概念についてのメモ</p>',
  },
};

const handleSaveAllSpy = fn(async () => undefined);

const waitForEditorElement = async (canvasElement: HTMLElement) => {
  await waitFor(() => {
    expect(canvasElement.querySelector('.ProseMirror')).not.toBeNull();
  });
  return canvasElement.querySelector('.ProseMirror') as Element;
};

const meta: Meta<typeof Editor> = {
  component: Editor,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    heading,
    handleSaveAll: handleSaveAllSpy,
  },
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const AppearenceTest: Story = {
  args: {},
};

export const EmptyHeadingTest: Story = {
  args: {
    heading: undefined,
  },
};

export const SaveDisabledByDefaultTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const saveButton = canvas.getByRole('button', { name: '保存' });
    await expect(saveButton).toBeDisabled();
  },
};

export const EditTitleAndSaveTest: Story = {
  play: async ({ canvasElement }) => {
    handleSaveAllSpy.mockClear();
    const canvas = within(canvasElement);
    await waitForEditorElement(canvasElement);
    const saveButton = canvas.getByRole('button', { name: '保存' });
    const titleInput = canvas.getByLabelText('heading-title');

    await userEvent.type(titleInput, '追記');
    await waitFor(() => {
      expect(saveButton).toBeEnabled();
    });

    await userEvent.click(saveButton);
    await waitFor(() => {
      expect(handleSaveAllSpy).toHaveBeenCalledWith(
        '第1章追記',
        1,
        '<p>プログラミングの基礎概念についてのメモ</p>',
        1,
      );
    });
  },
};

export const EditMemoAndSaveTest: Story = {
  play: async ({ canvasElement }) => {
    handleSaveAllSpy.mockClear();
    const canvas = within(canvasElement);
    const saveButton = canvas.getByRole('button', { name: '保存' });
    const editorElement = await waitForEditorElement(canvasElement);

    await userEvent.click(editorElement);
    await userEvent.keyboard('追記');
    await waitFor(() => {
      expect(saveButton).toBeEnabled();
    });

    await userEvent.click(saveButton);
    await waitFor(() => {
      expect(handleSaveAllSpy).toHaveBeenCalledWith(
        '第1章',
        1,
        expect.stringContaining('追記'),
        1,
      );
    });
  },
};
