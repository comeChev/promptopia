import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        //serverless route
        await connectToDB();

        // check if user exists
        const userExists = await User.findOne({ email: profile?.email });

        // if not, create user & save it to db
        if (!userExists) {
          console.log(profile);
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            //@ts-ignore
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      image: string;
      sub: number;
      exp: number;
      iat: number;
      jti: string;
    };
  }
}
