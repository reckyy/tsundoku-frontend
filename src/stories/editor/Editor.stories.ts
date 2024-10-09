import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import Editor from '@/components/editor/Editor';
import toast from 'react-hot-toast';

const testData = {
  id: 1,
  number: 1,
  title: '第1章',
  memo: {
    id: 1,
    body: '第1章のメモ',
  },
};

const meta: Meta<typeof Editor> = {
  component: Editor,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    heading: testData,
    handleSave: async () => {
      toast.success('メモの保存が完了しました。');
    },
  },
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const AppearenceTest: Story = {
  args: {},
};

export const SaveMemoTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByLabelText('heading-title');
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, '変更後の章のタイトル');
    const saveButton = canvas.getByRole('button', { name: '保存' });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(
        canvas.getByText('メモの保存が完了しました。'),
      ).toBeInTheDocument();
    });
    expect(canvas.getByDisplayValue('変更後の章のタイトル'));
  },
};
