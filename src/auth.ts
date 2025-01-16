import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import { addUser } from "./service/user";

const providers: Provider[] = [Google];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

const authOptions: NextAuthConfig = {
  providers,
  callbacks: {
    async signIn({ user: { id, name, email, image } }) {
      if (!email) {
        return false
      }
      addUser({ id: id || '', name: name || '', email, image, username: email.split("@")[0] })
      return true
    },
    async session({ session }) {
      const user = session?.user;

      if (user) {
        session.user = {
          ...user,
          username: user.email.split("@")[0],
        };

      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
