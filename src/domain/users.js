import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getUserByIdDb = async (id) => {
  return prisma.user.findUnique({
    where: {
      id
    }
  })
}
