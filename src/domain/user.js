import { PrismaClient } from "@prisma/client"
import { hashString } from "../helper/hashing.js"

const prisma = new PrismaClient()

export const createUserDb = async (username, password, role = "USER") => {
	const user = await prisma.user.create({ data: {
		username,
		password: await hashString(password),
		role
	}
	})
	return user
}

export const getUsersDb = async () => {
	return await prisma.user.findMany()
}

export const getUserDb = async (id) => {
	const user = await prisma.user.findUnique({
		where: {
			id
		}
	})
	return user
}

export const getUserByUsername = async (username) => {
	const user = await prisma.user.findUnique({
		where: {
			username
		}
	})
	return user
}
