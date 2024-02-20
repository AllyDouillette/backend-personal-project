import { PrismaClient } from "@prisma/client"
import { hashString } from "../helper/hashing.js"

const prisma = new PrismaClient()

export const createUserDb = async (email, password) => {
	console.log("inside domain")
	const user = await prisma.user.create({ data: {
		email,
		password: await hashString(password)
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
	delete user.password
	return user
}
