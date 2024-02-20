import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createUserDb = async (email, password) => {
	return await prisma.user.create({ email, password })
}

export const getUserByIdDb = async (id) => {
	const user = await prisma.user.findUnique({
		where: {
			id
		}
	})
	return user
}
