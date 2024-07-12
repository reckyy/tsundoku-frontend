export type Book = {
  id: number;
  title: string;
  author: string;
  cover_image_url: string;
};

export type BookProps = {
  book: Book;
};
