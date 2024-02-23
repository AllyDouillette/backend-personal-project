import { PrismaClient } from "@prisma/client"
import { Card, Category } from "../src/helper/constructors.js"
import  { createUserDb } from "../src/domain/user.js"
import { User } from "../src/helper/constructors.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
import { hashString } from "../src/helper/hashing.js"
import { processArray, testCardsGermanToFrench, testCardsFrenchToGerman } from "../src/data/actualcards.js"
import { createCategoryDb } from "../src/domain/category.js"
const prisma = new PrismaClient()

async function seed () {
	// create multiple users
	const mom = await createUserDb("hummel", "fleißigesbienchen")
	console.log(mom)

	let users = []
	for (let i = 0; i < 5; i++) {
		const randomUser = new User()
		randomUser.Role = "USER"
		randomUser.password = await hashString(randomUser.password)
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

	await createUserDb("admin@sevenbrains.com", "admin", "ADMIN")

	const momCategoryGermanToFrench = await createCategoryDb("Mamas Vokabeln – D zu F", mom.id)
	const momCategoryFrenchToGerman = await createCategoryDb("Mamas Vokabeln – F zu D", mom.id)

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

	const momsCardsGermanToFrench = processArray(testCardsGermanToFrench)
	momsCardsGermanToFrench.forEach(card => {
		card.setCategory(momCategoryGermanToFrench.id)
		card.setOwner(mom.id)
	})

	const momsCardsFrenchToGerman = processArray(testCardsFrenchToGerman)
	momsCardsFrenchToGerman.forEach(card => {
		card.setCategory(momCategoryFrenchToGerman.id)
		card.setOwner(mom.id)
	})

	await prisma.card.createMany({ data: momsCardsGermanToFrench })
	await prisma.card.createMany({ data: momsCardsFrenchToGerman })

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
		await prisma.card.createMany({ data: cards })
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
