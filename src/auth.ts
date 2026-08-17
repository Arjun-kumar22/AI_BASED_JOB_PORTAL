import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

// import { PrismaAdapter } from '@auth/prisma-adapter';
// import { prisma } from '@/lib/prisma';
// adapter: PrismaAdapter(prisma),

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET!,

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' },
      },
      async authorize(credentials) {
        // When DATABASE_URL is set, replace this with real DB lookup:
        // const user = await prisma.user.findUnique({ where: { email } });
        // const valid = await bcrypt.compare(password, user.password);
        
        // Transitional: delegate to portalStore for compatibility
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;
        const role = (credentials.role as string) || 'candidate';

        // Minimal hardcoded test accounts for local dev (remove in production)
        const testAccounts: Record<string, { id: string; name: string; email: string; role: string; password: string }> = {
          'admin@titan.edu': { id: 'admin-1', name: 'TITAN Admin', email: 'admin@titan.edu', role: 'admin', password: 'admin123' },
          'candidate@titan.edu': { id: 'user-1', name: 'Alex Morgan', email: 'candidate@titan.edu', role: 'candidate', password: 'pass123' },
          'recruiter@titan.edu': { id: 'user-2', name: 'HR Manager', email: 'recruiter@titan.edu', role: 'recruiter', password: 'pass123' },
        };

        const account = testAccounts[email];
        if (account && account.password === password) {
          return { id: account.id, name: account.name, email: account.email, role: account.role };
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'candidate';
      }
      if (account?.provider === 'google') {
        token.role = 'candidate'; // Default role for Google sign-ins
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  trustHost: true,
});
