import { auth } from '#auth';
import SignInButton from '../button/SignInButton';
import type { PropsWithChildren } from 'react';

const AuthGuard = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  return <div>{!session?.user ? <SignInButton /> : children}</div>;
};

export default AuthGuard;
