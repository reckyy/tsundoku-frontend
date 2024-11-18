import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { NextResponse } from 'next/server';
import { axiosInstance } from '@/lib/axios';

declare module 'next-auth' {
  interface User {
    accessToken: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id && user?.accessToken) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken && token.id) {
        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      const name = user.name;
      const email = user.email;
      const avatarUrl = user.image;
      const idToken = account?.id_token;
      try {
        const res = await axiosInstance.post('/auth/callback/google', {
          name,
          email,
          avatarUrl,
          idToken,
        });
        if (res.status === 200) {
          user.id = res.data.id;
          user.accessToken = res.data.access_token as string;
          return true;
        } else {
          return false;
        }
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
