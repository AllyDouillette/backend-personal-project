import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getCardsDb = async () => {
	const cards = await prisma.card.findMany()
	return cards
}
