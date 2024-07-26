import { screen } from '@testing-library/react';
import { render } from '@/test-utils/render';
import Results from '@/components/search/Results';
import AddBookConfirmContent from '@/components/modal/AddBookConfirmContent';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

const user = userEvent.setup();

jest.mock('axios');
jest.mock('next-auth/react');
jest.mock('next/navigation');

const mockBook = {
  id: 1,
  title: 'テストの書籍',
  author: 'テスト書籍の著者',
  coverImageUrl: 'https://thumnailtest1.jpg',
};

const mockedAxiosGet = axios.get as jest.Mock;
mockedAxiosGet.mockResolvedValue([mockBook]);

const mockedAxiosPost = axios.post as jest.Mock;
mockedAxiosPost.mockResolvedValue({ status: 200 });

describe('AddBookConfirmModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show modal content', async () => {
    render(<Results bookItems={[mockBook]} />);
    const value = '本棚に追加';
    await user.click(screen.getByText(value));
    const bookTitle =
      await screen.findByText('テストの書籍を本棚に追加しますか？');
    expect(bookTitle).toBeInTheDocument();
  });

  it('should call router.push on book addition', async () => {
    render(<AddBookConfirmContent book={mockBook} />);
    const value = '追加';
    await user.click(screen.getByText(value));
    expect(useRouter().push).toHaveBeenCalledWith('/');
  });
});
