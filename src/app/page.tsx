import Login from '@/components/Login';
import SearchBooksButton from '@/components/button/SearchBooksButton';

export default function Home() {
  return (
    <div>
      <SearchBooksButton />
      <Login />
    </div>
  );
}
