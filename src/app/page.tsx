import SearchBooksButton from '@/components/button/SearchBooksButton';
import BookItems from '@/components/bookshelf/BookItems';
import Cal from '@/components/Cal/Cal';

export default async function Home() {
  return (
    <div>
      <SearchBooksButton />
      <BookItems />
      <Cal />
    </div>
  );
}
