import { auth } from '#auth';
import TopPage from '@/components/top/TopPage';
import AuthenticatedTopPage from '@/components/top/AuthenticatedTopPage';

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return <AuthenticatedTopPage />;
  } else {
    return <TopPage />;
  }
}
