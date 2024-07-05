import create from 'zustand';

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
}

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
};

const useBookStore = create<BookState>((set) => ({
  bookItems: { bookItems: [] },
  isInitialized: false,
  setBookItems: (bookItems: BookItems) =>
    set({ bookItems: bookItems, isInitialized: true }),
}));

export default useBookStore;
