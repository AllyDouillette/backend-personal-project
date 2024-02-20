import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createUserDb = async (email, password) => {
	console.log("inside domain")
	const user = await prisma.user.create({ data: {
		email,
		password
	}
	})
	return user
}

export const getUserByIdDb = async (id) => {
	const user = await prisma.user.findUnique({
		where: {
			id
		}
	})
	return user
}
