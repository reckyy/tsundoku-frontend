import toast from 'react-hot-toast';
import { Book } from '@/types/index';

type Item = {
  Item: {
    affiliateUrl: string;
    author: string;
    authorKana: string;
    availability: string;
    booksGenreId: string;
    chirayomiUrl: string;
    contents: string;
    discountPrice: number;
    discountRate: number;
    isbn: string;
    itemCaption: string;
    itemPrice: number;
    itemUrl: string;
    largeImageUrl: string;
    limitedFlag: number;
    listPrice: number;
    mediumImageUrl: string;
    postageFlag: number;
    publisherName: string;
    reviewAverage: string;
    reviewCount: number;
    salesDate: string;
    seriesName: string;
    seriesNameKana: string;
    size: string;
    smallImageUrl: string;
    subTitle: string;
    subTitleKana: string;
    title: string;
    titleKana: string;
  };
};

type SearchParams = {
  searchWord: string;
  selected: { label: string; target: string };
  onResults: (books: Book[]) => void;
};

export async function searchBooks({
  searchWord,
  selected,
  onResults,
}: SearchParams) {
  const params = new URLSearchParams(
    selected.label === 'title' ? { title: searchWord } : { author: searchWord },
  );

  try {
    const res = await fetch(`/api/books/search?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const books = data.Items.map((element: Item, index: number) => ({
      id: index + 1,
      title: element.Item.title,
      author: element.Item.author,
      coverImageUrl: element.Item.largeImageUrl,
    }));
    onResults(books);
  } catch (error) {
    console.warn(error);
    toast.error('本の検索に失敗しました。');
  }
}
