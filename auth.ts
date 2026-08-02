import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { authConfig } from "./auth.config";

type OwnerUser = {
  id: string;
  name: string;
  email: string;
};

function getOwnerUserByEmail(email: string): OwnerUser | null {
  const ownerEmail = process.env.AUTH_OWNER_EMAIL;

  if (!ownerEmail) {
    return null;
  }

  if (email.toLowerCase() !== ownerEmail.toLowerCase()) {
    return null;
  }

  return {
    id: "owner",
    name: process.env.AUTH_OWNER_NAME ?? "Ward Clerk",
    email: ownerEmail,
  };
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = getOwnerUserByEmail(parsed.data.email);
        const ownerPasswordHash = process.env.AUTH_OWNER_PASSWORD_HASH;

        if (!user || !ownerPasswordHash) {
          return null;
        }

        const matches = await bcrypt.compare(parsed.data.password, ownerPasswordHash);

        if (!matches) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
