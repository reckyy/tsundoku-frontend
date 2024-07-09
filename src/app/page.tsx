import SearchBooksButton from '@/components/button/SearchBooksButton';
import BookItems from '@/components/bookshelf/BookItems';

export default async function Home() {
  return (
    <div>
      <SearchBooksButton />
      <BookItems />
    </div>
  );
}
