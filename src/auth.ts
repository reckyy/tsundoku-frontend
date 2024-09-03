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

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, profile, trigger, session }) {
      if (!token.handleName || !token.id) {
        try {
          const res = await axios.get(
            'http://localhost:3001/api/auth/add_session_user_data',
            {
              params: { email: token.email },
            },
          );
          if (res.status === 200) {
            token.id = res.data.id;
            token.handleName = res.data.handle_name;
          }
        } catch (error) {
          console.warn(error);
        }
      }
      if (profile) {
        token.sub = profile.sub || undefined;
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
