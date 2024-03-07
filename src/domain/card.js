import { PrismaClient } from "@prisma/client"
import { maxLevel } from "../helper/helper.js"
const prisma = new PrismaClient()

export const getCardsDb = async () => {
	return await prisma.card.findMany()
}

export const getCardDb = async (id) => {
	return await prisma.card.findUnique({
		where: {
			id
		}
	})
}

export const getCardsFromCategoryDb = async (categoryId) => {
	return await prisma.card.findMany({
		where: {
			categoryId
		}
	})
}

export const getCardsFromOwnerDb = async (ownerId) => {
	return await prisma.card.findMany({
		where: {
			ownerId
		}
	})
}

export const createCardDb = async (prompt, answer, hint = "", categoryId, ownerId) => {
	return await prisma.card.create({
		data: {
			prompt,
			answer,
			hint,
			category: {
				connect: {
					id: categoryId
				}
			},
			owner: {
				connect: {
					id: ownerId
				}
			}
		}
	})
}

export const updateCardDb = async (id, prompt, answer, hint, level, repetitions, categoryId, lastAskedAt) => {
	return await prisma.card.update({
		where: {
			id
		},
		data: {
			prompt,
			answer,
			hint,
			level,
			repetitions,
			categoryId,
			lastAskedAt
		}
	})
}

export const updateCardStatsDb = async (id, level, repetitions, lastAskedAt = new Date().toISOString()) => {
	return await prisma.card.update({
		where: {
			id
		},
		data: {
			level,
			repetitions,
			lastAskedAt
		}
	})
}

export const deleteCardDb = async (id) => {
	return await prisma.card.delete({
		where: {
			id
		}
	})
}
