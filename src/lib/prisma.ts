import { PrismaClient, Prisma } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const client = globalThis.prisma || new PrismaClient();
export { Prisma };
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
