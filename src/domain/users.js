import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createUserDb = async (email, password) => {
	return prisma.user.create({ email, password })
}

export const getUserByIdDb = async (id) => {
	return prisma.user.findUnique({
		where: {
			id
		}
	})
}
