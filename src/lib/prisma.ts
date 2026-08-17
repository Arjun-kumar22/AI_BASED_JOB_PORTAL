import { PrismaClient } from '@prisma/client';

// Prevent multiple PrismaClient instances in development (Next.js hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Lazy-initialize Prisma Client so it doesn't crash during `next build`
// when DATABASE_URL may not be set yet (Vercel build-time vs runtime env vars)
function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  return globalForPrisma.prisma;
}

// Export a proxy that only creates the PrismaClient when a property is accessed
// This prevents the build from failing when DATABASE_URL is not set
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});
