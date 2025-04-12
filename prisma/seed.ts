// import { ProductType } from '@/app/generated/prisma/client'
// import { PrismaClient } from '@prisma/client'
// import { hash } from 'bcryptjs'

// const prisma = new PrismaClient()

// async function main() {
//   // Clear existing data (optional)
//   await prisma.product.deleteMany()
//   await prisma.user.deleteMany()

//   // Create test users
//   const user1 = await prisma.user.create({
//     data: {
//       email: 'user1@example.com',
//       password: await hash('password123', 10),
//     },
//   })

//   const user2 = await prisma.user.create({
//     data: {
//       email: 'user2@example.com',
//       password: await hash('password123', 10),
//     },
//   })

//   // Create test products
//   await prisma.product.createMany({
//     data: [
//       {
//         owner_id: user1.id,
//         name: 'Smartphone X',
//         price: 999,
//         type: ProductType.phone,
//         detail: 'Latest model with advanced camera',
//       },
//       {
//         owner_id: user1.id,
//         name: 'Wireless Earbuds',
//         price: 199,
//         type: ProductType.device,
//         detail: 'Noise cancelling with 24h battery',
//       },
//       {
//         owner_id: user2.id,
//         name: 'Tablet Pro',
//         price: 799,
//         type: ProductType.device,
//         detail: '12.9" display with stylus support',
//       },
//     ],
//   })

//   console.log('Database seeded successfully!')
// }

// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })