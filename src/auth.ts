import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./network/external/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        const data = await login(credentials.email, credentials.password);
        if (!data) return null;

        const { token, user } = data;
        if (!user?.isApproved) return null;

        return {
          ...user,
          accessToken: token,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }

      if (token.user) {
        session.user = token.user as any;
      }

      return session;
    },
  },
});
