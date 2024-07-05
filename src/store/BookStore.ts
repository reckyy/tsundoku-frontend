import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Book = {
  id: number;
  title: string;
  author: string;
  cover_image_url: string;
};

type Heading = {
  id: number;
  number: number;
  title: string | null;
  memo: Memo;
};

type Memo = {
  id: number;
  body: string;
};

type BookItem = {
  book: Book;
  headings: Heading[];
};

type BookItems = {
  bookItems: BookItem[];
};

type BookState = {
  bookItems: BookItems;
  isInitialized: boolean;
  setBookItems: (bookitems: BookItems) => void;
  updateMemo: (bookId: number, headingId: number, memoBody: string) => void;
};

const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      bookItems: { bookItems: [] },
      isInitialized: false,
      setBookItems: (bookItems: BookItems) =>
        set({ bookItems: bookItems, isInitialized: true }),
      updateMemo: (bookId: number, headingId: number, memoBody: string) =>
        set((state) => ({
          bookItems: {
            bookItems: state.bookItems.bookItems.map((bookItem) =>
              bookItem.book.id === bookId
                ? {
                    ...bookItem,
                    headings: bookItem.headings.map((heading) =>
                      heading.number === headingId
                        ? {
                            ...heading,
                            memo: {
                              ...heading.memo,
                              body: memoBody,
                            },
                          }
                        : heading,
                    ),
                  }
                : bookItem,
            ),
          },
        })),
    }),
    {
      name: 'book-storage',
    },
  ),
);

export default useBookStore;
