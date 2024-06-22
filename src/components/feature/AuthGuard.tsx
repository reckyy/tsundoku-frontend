import { auth } from '@/auth';
import SignInButton from '../button/SignInButton';

type Props = {
  children: React.ReactNode;
};

const AuthGuard = async ({ children }: Props) => {
  const session = await auth();
  return <div>{!session?.user ? <SignInButton /> : <>{children}</>}</div>;
};

export default AuthGuard;
