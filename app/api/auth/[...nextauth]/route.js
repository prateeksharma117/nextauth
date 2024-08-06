"use server"
import nextAuth from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnection } from "../../dbConnection";
import User from "../../models/user.model";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await dbConnection()
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          name: user.name,
          email: user.email,
          bio: user.bio,
          country: user.country,
          address: user.address,
          gender: user.gender,
        };
      }

      if (trigger === "update") {
        const {name, email, bio, country, address, gender} = session.user;
        return { ...token, name, email, bio, country, address, gender };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
          bio: token.bio,
          country: token.country,
          address: token.address,
          gender: token.gender,
        };
      }
      return session;
    },
  },
  Session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-up",
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
