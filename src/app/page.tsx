import { auth } from '#auth';
import TopPage from '@/components/top/TopPage';
import AuthenticatedTopPage from '@/components/top/AuthenticatedTopPage';
import Welcome from '@/components/top/Welcome';

export default async function Home() {
  const session = await auth();
  if (session?.user.handleName.includes('User')) {
    return <Welcome />;
  } else if (session?.user) {
    return <AuthenticatedTopPage />;
  } else {
    return <TopPage />;
  }
}
