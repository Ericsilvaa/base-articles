import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$disconnect() // Make sure to disconnect when the application exits

export { prisma }
