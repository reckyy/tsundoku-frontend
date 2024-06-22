import SearchBooksButton from '@/components/button/SearchBooksButton';
import BookItems from '@/components/bookshelf/BookItems';

export default function Home() {
  return (
    <div>
      <SearchBooksButton />
      <BookItems />
    </div>
  );
}
