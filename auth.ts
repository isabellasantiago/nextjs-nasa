import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google'
import { User } from "@/app/lib/definitions";
import { envs } from "@/helpers/envs";
import { conncectToDatabase } from "@/helpers/server-helpers";
import client from "@/prisma/client";
import { z } from 'zod';
import bcrypt from 'bcrypt'

async function getUser(email: string): Promise<User | undefined> {
  try {
    await conncectToDatabase()
    const user = await client.user.findFirst({ where: { email } })
    return user ?? undefined
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  } finally {
    await client.$disconnect()
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = z.object({
            email: z.string().email('Invalid email'),
            password: z.string().min(8, 'At least 8 characters')
          }).safeParse(credentials)

          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email)
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.hashedPassword || '');

            if (passwordsMatch) return user;
          }

          console.log('Invalid credentials');
          return null;
        } catch (error) {
          console.log(error)
        }
        return null
      }
    }),
    GoogleProvider({
      clientId: envs.google_id,
      clientSecret: envs.google_secret
    }),
  ],
  session: {
    strategy: "jwt"
  },
  secret: envs.next_auth_secret,
});