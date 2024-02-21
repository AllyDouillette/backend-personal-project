import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getCardsDb = async () => {
	const cards = await prisma.card.findMany()
	return cards
}

export const getCardByIdDb = async (id) => {
	return await prisma.card.findUnique({
		where: {
			id
		}
	})
}

export const createCardDb = async (prompt, answer, hint = "", categoryId, ownerId) => {
	return await prisma.card.create({
		data: {
			prompt,
			answer,
			hint,
			Category: {
				connect: {
					id: categoryId
				}
			},
			Owner: {
				connect: {
					id: ownerId
				}
			}
		}
	})
}

export const updateCardDb = async (id, prompt, answer, hint, level, categoryId) => {
	const card = await prisma.card.update({
		where: {
			id
		},
		data: {
			prompt,
			answer,
			hint,
			level,
			categoryId
		}
	})
	return card
}

export const deleteCardDb = async (id) => {
	return await prisma.card.delete({
		where: {
			id
		}
	})
}
