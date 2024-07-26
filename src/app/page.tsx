import SearchBooksButton from '@/components/button/SearchBooksButton';
import AuthenticatedBookItems from '@/components/bookshelf/AuthenticatedBookItems';
import Cal from '@/components/Cal/Cal';
import { auth } from '#auth';
import TopPage from '@/components/top/TopPage';

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return (
      <div>
        <SearchBooksButton />
        <AuthenticatedBookItems />
        <Cal />
      </div>
    );
  } else {
    return <TopPage />;
  }
}
