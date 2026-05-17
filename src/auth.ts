import NextAuth, { type DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import { NextResponse } from 'next/server';
import { apiPost } from '@/lib/api/server';
import { THIRTY_DAYS_IN_SECONDS } from '@/constants/session';

type BackendSignInResponse = {
  id: string;
  access_token: string;
  access_token_expires_at: string;
};

type AuthToken = {
  id?: string;
  accessToken?: string;
  accessTokenExpiresAt?: string;
};

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id?: string;
      accessToken?: string;
      accessTokenExpiresAt?: string;
    };
  }

  interface User {
    id?: string;
    accessToken?: string;
    accessTokenExpiresAt?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: {
    maxAge: THIRTY_DAYS_IN_SECONDS,
  },
  callbacks: {
    async jwt({ token, user }) {
      const authToken = token as typeof token & AuthToken;

      if (user?.id && user?.accessToken && user?.accessTokenExpiresAt) {
        authToken.id = user.id;
        authToken.accessToken = user.accessToken;
        authToken.accessTokenExpiresAt = user.accessTokenExpiresAt;
      }

      if (authToken.accessToken && !authToken.accessTokenExpiresAt) {
        return null;
      }

      if (
        authToken.accessTokenExpiresAt &&
        Date.now() >= Date.parse(authToken.accessTokenExpiresAt)
      ) {
        return null;
      }

      return authToken;
    },
    async session({ session, token }) {
      const authToken = token as typeof token & AuthToken;

      if (
        authToken.accessToken &&
        authToken.id &&
        authToken.accessTokenExpiresAt
      ) {
        session.user.id = authToken.id;
        session.user.accessToken = authToken.accessToken;
        session.user.accessTokenExpiresAt = authToken.accessTokenExpiresAt;
      }
      return session;
    },

    async signIn({ user, account }) {
      const name = user.name;
      const email = user.email;
      const avatarUrl = user.image;
      const idToken = account?.id_token;
      try {
        const data = (await apiPost('/auth/callback/google', undefined, {
          name,
          email,
          avatarUrl,
          idToken,
        })) as BackendSignInResponse;
        user.id = data.id;
        user.accessToken = data.access_token;
        user.accessTokenExpiresAt = data.access_token_expires_at;
        return true;
      } catch (error) {
        return false;
      }
    },
    authorized: async ({ request, auth }) => {
      if (auth) {
        return true;
      } else {
        return NextResponse.redirect(new URL('/', request.nextUrl));
      }
    },
  },
});
