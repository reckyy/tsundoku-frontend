import { Session } from 'next-auth';
import { THIRTY_DAYS_IN_SECONDS } from '@/constants/session';

type MockSessionUser = NonNullable<Session['user']>;

export const createMockSession = (user: MockSessionUser): Session => ({
  user,
  expires: new Date(Date.now() + THIRTY_DAYS_IN_SECONDS * 1000).toISOString(),
});
