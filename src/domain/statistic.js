import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getStatisticsDb = async () => {
	return await prisma.statistic.findMany()
}
