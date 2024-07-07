import SearchBooksButton from '@/components/button/SearchBooksButton';
import BookItems from '@/components/bookshelf/BookItems';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  const res = await fetch(
    `http://localhost:3001/api/books?email=${session?.user?.email}`,
  );
  const bookItems = await res.json();
  return (
    <div>
      <SearchBooksButton />
      <BookItems bookItems={bookItems} />
    </div>
  );
}
