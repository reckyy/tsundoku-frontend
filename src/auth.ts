import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import axios from 'axios';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      const name = user.name;
      const email = user.email;
      const avatarUrl = user.image;
      try {
        const res = await axios.post(
          'http://localhost:3001/api/auth/callback/google',
          {
            name,
            email,
            avatarUrl,
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
  },
});
