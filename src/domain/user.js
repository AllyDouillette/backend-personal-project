import { PrismaClient } from "@prisma/client"
import { hashString } from "../helper/hashing.js"

const prisma = new PrismaClient()

export const createUserDb = async (username, email, password, role = "USER") => {
	const user = await prisma.user.create({ data: {
		username,
		email,
		password: await hashString(password),
		role,
		profile: {
			create: {}
		}
	},
	include: {
		profile: true
	}
	})
	return user
}

export const getUsersDb = async () => {
	return await prisma.user.findMany()
}

export const getUserDb = async (id, includeProfile = false) => {
	const user = await prisma.user.findUnique({
		where: {
			id
		},
		include: {
			profile: includeProfile
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
