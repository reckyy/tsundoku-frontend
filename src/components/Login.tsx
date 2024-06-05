import { SignIn } from '@/components/signin-button';
import { SignOut } from '@/components/signout-button';
import { auth } from '@/auth';

export default async function Login() {
  const session = await auth();

  return <div>{!session?.user ? <SignIn /> : <SignOut />}</div>;
}
