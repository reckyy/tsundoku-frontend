import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { API_CONSTS } from '@/consts/apiConsts';

const { RAILS_API_URL } = API_CONSTS;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token }) {
      if (!token.id) {
        try {
          const res = await axios.get(
            `${RAILS_API_URL}/auth/add_session_user_data`,
            {
              params: { email: token.email },
            },
          );
          if (res.status === 200) {
            token.id = res.data.id;
          }
        } catch (error) {
          console.warn(error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },

    async signIn({ user }) {
      const name = user.name;
      const email = user.email;
      const avatarUrl = user.image;
      try {
        const res = await axios.post(`${RAILS_API_URL}/auth/callback/google`, {
          name,
          email,
          avatarUrl,
        });
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
