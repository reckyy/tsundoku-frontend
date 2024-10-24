import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { NextResponse } from 'next/server';
import { axiosInstance } from '@/lib/axios';

declare module 'next-auth' {
  interface User {
    idToken: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id && user?.idToken) {
        token.id = user.id;
        token.idToken = user.idToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.idToken && token.id) {
        session.user.id = token.id as string;
        session.user.idToken = token.idToken as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      const name = user.name;
      const email = user.email;
      const avatarUrl = user.image;
      try {
        const res = await axiosInstance.post('/auth/callback/google', {
          name,
          email,
          avatarUrl,
        });
        if (res.status === 200) {
          user.id = res.data.id;
          user.idToken = account?.id_token as string;
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
