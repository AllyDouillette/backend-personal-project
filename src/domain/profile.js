import { PrismaClient } from "@prisma/client/extension"

const prisma = new PrismaClient()

export const getProfileDb = async (id) => {
	const profile = await prisma.profile.findUnique({
		where: {
			id
		}
	})
	return profile
}
