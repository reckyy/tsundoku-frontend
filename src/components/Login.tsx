import { SignInButton } from '@/components/button/SignInButton';
import { SignOutButton } from '@/components/button/SignOutButton';
import { auth } from '@/auth';

export default async function Login() {
  const session = await auth();

  return <div>{!session?.user ? <SignInButton /> : <SignOutButton />}</div>;
}
