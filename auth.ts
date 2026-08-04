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

function getOwnerPasswordCandidate(): string | null {
  const passwordHash = process.env.AUTH_OWNER_PASSWORD_HASH;

  if (passwordHash) {
    return passwordHash;
  }

  const plainPassword = process.env.AUTH_OWNER_PASSWORD;

  return plainPassword ?? null;
}

async function validateOwnerPassword(password: string): Promise<boolean> {
  const passwordCandidate = getOwnerPasswordCandidate();

  if (!passwordCandidate) {
    return false;
  }

  if (passwordCandidate.startsWith("$2")) {
    return bcrypt.compare(password, passwordCandidate);
  }

  return password === passwordCandidate;
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  trustHost: true,
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

        if (!user) {
          return null;
        }

        const matches = await validateOwnerPassword(parsed.data.password);

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
