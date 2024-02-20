import { PrismaClient } from '@prisma/client'
import User from '../src/helper/constructors.js'
const prisma = new PrismaClient()

async function seed() {
  const newUser = new User('Test@Something.com', 'password123')
  const user = await prisma.user.create({
    data: newUser
  })
  console.log(user)
}

seed().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
