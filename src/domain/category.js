import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getCategoriesDb = async () => {
	const categories = await prisma.category.findMany()
	return categories
}

export const createCategoryDb = async (name, ownerId) => {
	const category = await prisma.category.create({
		data: {
			name,
			ownerId
		}
	})
	return category
}

export const getCategoryDb = async (id) => {
	const category = await prisma.category.findUnique({
		where: {
			id
		}
	})
	return category
}

export const updateCategoryDb = async (id, name) => {
	const category = await prisma.category.update({
		where: {
			id
		},
		data: {
			name
		}
	})
	return category
}

export const deleteCategoryDb = async (id) => {
	const category = await prisma.category.delete({
		where: {
			id
		}
	})
	return category
}
