import { PrismaClient } from "@/app/generated/prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') {
  globalThis.prisma = prisma
}

export default prisma