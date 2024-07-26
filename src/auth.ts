import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.sub = profile.sub || undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async signIn({ user, profile }) {
      const name = user.name;
      const email = user.email;
      const avatarUrl = user.image;
      const uid = profile?.sub;
      try {
        const res = await axios.post(
          'http://localhost:3001/api/auth/callback/google',
          {
            name,
            email,
            avatarUrl,
            uid,
          },
        );
        if (res.status === 200) {
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
