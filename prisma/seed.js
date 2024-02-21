import { PrismaClient } from "@prisma/client"
import { Card, Category } from "../src/helper/constructors.js"
import  { createUserDb } from "../src/domain/user.js"
import { User } from "../src/helper/constructors.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
const prisma = new PrismaClient()

async function seed () {
	// create multiple users

	let users = []
	for (let i = 0; i < 5; i++) {
		const randomUser = new User()
		randomUser.Role = "USER"
		users.push(randomUser)
	}

	try {
		await prisma.user.createMany({	data: users })
		users = await prisma.user.findMany()
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			console.log("Prisma error", error)
		}
		console.log(error, "error creating during creation of characters")
	}

	const admin = await createUserDb("admin@sevenbrains.com", "admin", "ADMIN")
	console.log(admin)

	let categories = users.map(user => {
		const category = new Category(`Testing Category by ${user.username}`)
		category.setOwner(user.id)
		return category
	})

	try {
		await prisma.category.createMany({
			data: categories
		})
		categories = await prisma.category.findMany()
	} catch (error) {
		console.log("error creating categories", error.code)
	}

	let cards = []
	categories.forEach(category => {
		for (let i = 0; i < 5; i++) {
			const newCard = new Card()
			newCard.setCategory(category.id)
			newCard.setOwner(category.ownerId)
			cards.push(newCard)
		}
	})

	try {
		const createdCards = await prisma.card.createMany({	data: cards	})
		console.log(createdCards)
	} catch (error) {
		console.log("error creating cards", error.code)
	}

	process.exit(0)
}

seed().catch(async (e) => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
})
