import NextAuth, { type DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import axios from 'axios';
import { NextResponse } from 'next/server';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      handleName: string;
    } & DefaultSession['user'];
  }
}

const apiUrl: string = process.env.NEXT_PUBLIC_RAILS_API_URL ?? '';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (!token.handleName || !token.id) {
        try {
          const res = await axios.get(`${apiUrl}/auth/add_session_user_data`, {
            params: { email: token.email },
          });
          if (res.status === 200) {
            token.id = res.data.id;
            token.handleName = res.data.handle_name;
          }
        } catch (error) {
          console.warn(error);
        }
      }
      if (trigger === 'update') {
        token.handleName = session.user.handleName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      if (token.handleName) {
        session.user.handleName = token.handleName as string;
      }
      return session;
    },

    async signIn({ user }) {
      const name = user.name;
      const email = user.email;
      const avatarUrl = user.image;
      try {
        const res = await axios.post(`${apiUrl}/auth/callback/google`, {
          name,
          email,
          avatarUrl,
        });
        if (res.status === 200 || res.status === 201) {
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
