import { screen } from '@testing-library/react';
import { render } from '@/test-utils/render';
import SearchHome from '@/components/search/SearchHome';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

jest.mock('axios');

const mockResults = {
  data: {
    Items: [
      {
        Item: {
          id: 1,
          title: 'テストの書籍',
          author: 'テスト書籍のタイトル',
          coverImageUrl: 'https://thumnailtest1.jpg',
        },
      },
    ],
  },
};

const mockedAxiosGet = axios.get as jest.Mock;
mockedAxiosGet.mockResolvedValue(mockResults);

describe('SearchHome', () => {
  it('show book search results', async () => {
    render(<SearchHome />);
    const textInput = screen.getByRole('textbox', { name: '検索' });
    const value = 'テスト';
    await user.type(textInput, value);
    await user.keyboard('{Enter}');
    const bookTitle = await screen.findByText('テストの書籍');
    expect(bookTitle).toBeInTheDocument();
  });
});
