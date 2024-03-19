import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// prisma.$extends({
//   query: {
//     images: {
//       create({ args, query }) {
//         console.log('🚀 ~ create ~ args:', args)
//         if (!args.data.url) {
//           args.data.url = `http://localhost:3000/files/${args.data.key}`
//         }
//         return query(args)
//       },
//     },
//     articles: {
//       create({ args, query }) {
//         console.log('🚀 ~ create ~ args:', args)
//         return query(args)
//       },
//     },
//   },
// })

prisma.$disconnect() // Make sure to disconnect when the application exits

export { prisma }
