import { signIn } from '@/auth';
import GoogleButton from './GoogleButton';

const SignInButton = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <GoogleButton>Signin with Google</GoogleButton>
    </form>
  );
}

export default SignInButton
