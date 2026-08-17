import { PrismaClient } from '@prisma/client';

// Prevent multiple PrismaClient instances in development (Next.js hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Only create a real PrismaClient when DATABASE_URL is available.
// During Vercel `next build`, DATABASE_URL may not be set (it's a runtime env var),
// so we must guard the instantiation to prevent build crashes.
function createPrismaClient(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    // Return a dummy proxy during build — no DB calls should happen at build time anyway
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        // Allow toString / Symbol access for module evaluation
        if (typeof prop === 'symbol' || prop === 'then') return undefined;
        // Return an async no-op for any model method access during build
        return new Proxy(() => {}, {
          get() {
            return () => Promise.resolve(null);
          },
          apply() {
            return Promise.resolve(null);
          },
        });
      },
    });
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
