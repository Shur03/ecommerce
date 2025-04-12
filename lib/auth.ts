// lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import type { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Нууц үг эсвэл дугаар буруу");
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
            password: credentials.password,
          }
        });

        if (!user) {
          throw new Error("Бүртгэлгүй байна.");
          // router.back();
        }

        if (user?.password !== credentials.password) {
          throw new Error("Нууц үг буруу");
        }

        return { 
          id: user.id.toString(), 
          email: user.email, 
          password :user.password,
        };
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);

export const { auth, signIn, signOut } = NextAuth(authOptions);