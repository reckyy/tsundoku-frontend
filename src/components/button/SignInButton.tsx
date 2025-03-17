import { signIn } from '@/auth';
import GoogleButton from './GoogleButton';

export default function SignInButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/?authenticated=true' });
      }}
    >
      <GoogleButton type="submit">Googleログイン</GoogleButton>
    </form>
  );
}
