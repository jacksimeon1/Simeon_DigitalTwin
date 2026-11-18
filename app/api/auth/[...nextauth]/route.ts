import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const providers: any[] = [];

if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  );
}

// Guest / Demo credentials provider so chat can be tested immediately without Google Cloud Console setup
providers.push(
  CredentialsProvider({
    id: "guest",
    name: "Guest",
    credentials: {
      name: { label: "Name", type: "text", placeholder: "Guest Visitor" },
    },
    async authorize(credentials) {
      const name = credentials?.name?.trim() || "Guest Visitor";
      return {
        id: "guest-user",
        name: name,
        email: "guest@digitaltwin.local",
        image: "https://api.dicebear.com/7.x/bottts/svg?seed=" + encodeURIComponent(name),
      };
    },
  })
);

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "simeon-digital-twin-auth-secret-key-32chars",
  providers,
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch {}
      return baseUrl;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        if (user.image) {
          token.picture = user.image;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.id as string;
        if (token.picture) {
          session.user.image = token.picture as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

