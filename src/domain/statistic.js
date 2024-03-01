import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getStatisticsDb = async () => {
	return await prisma.statistic.findMany()
}

export const getStatisticForDateDb = async (date) => {
	return await prisma.statistic.findFirst({
		where: {
			date
		}
	})
}

export const getStatisticForDateRangeDb = async (startDate, endDate) => {
	return await prisma.statistic.findMany({
		where: {
			date: {
				gte: startDate,
				lte: endDate
			}
		}
	})
}

export const addStatisticsDb = async (userId, date) => {
	try {
		const response = await prisma.statistic.create({
			data: {
				userId,
				date,
				correct: 0,
				incorrect: 0
			}
		})
		return response
	} catch (error) {
		console.log(error, "error creating statistics")
	}
}
