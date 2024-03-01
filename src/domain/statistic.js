import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getStatisticsDb = async () => {
	return await prisma.statistic.findMany()
}

export const addStatisticsDb = async (userId, Date) => {
	try {
		const response = await prisma.statistic.create({
			data: {
				userId,
				Date,
				correct: 0,
				incorrect: 0
			}
		})
		return response
	} catch (error) {
		console.log(error, "error creating statistics")
	}
}
