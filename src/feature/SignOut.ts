'use server';

import { signOut } from '@/auth';

export async function handleSignOut(unsubscribed?: boolean) {
  return await signOut({ ...(unsubscribed && { redirectTo: '/thanks' }) });
}
