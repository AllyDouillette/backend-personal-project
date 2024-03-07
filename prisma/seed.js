import { PrismaClient } from "@prisma/client"
import { Card, Category } from "../src/helper/constructors.js"
import  { createUserDb } from "../src/domain/user.js"
import { User } from "../src/helper/constructors.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
import { hashString } from "../src/helper/hashing.js"
import { processArray,
	generalVocabGermanToFrench,
	generalVocabFrenchToGerman,
	verbsGermanToFrench,
	verbsFrenchToGerman,
	adjectivesGermanToFrench,
	adjectivesFrenchToGerman,
	adverbsFrenchToGerman
} from "../src/data/actualcards.js"
import { createCategoryDb } from "../src/domain/category.js"
import { addStatisticsDb } from "../src/domain/statistic.js"
const prisma = new PrismaClient()

async function seed () {
	// create multiple users
	const mom = await createUserDb("hummel", "fleißigesbienchen")
	console.log(mom)

	const statistic = await addStatisticsDb(mom.id, new Date(new Date().setUTCHours(0,0,0,0)).toISOString())
	console.log(statistic)

	let users = []
	for (let i = 0; i < 5; i++) {
		const randomUser = new User()
		randomUser.role = "USER"
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

	const momCategory1 = await createCategoryDb("Vocabulaire générale – D zu F", mom.id)
	const momCategory2 = await createCategoryDb("Vocabulaire générale – F zu D", mom.id)
	const momCategory3 = await createCategoryDb("Verbes – D zu F", mom.id)
	const momCategory4 = await createCategoryDb("Verbes – F zu D", mom.id)
	const momCategory5 = await createCategoryDb("Adjectives – D zu F", mom.id)
	const momCategory6 = await createCategoryDb("Verbes – F zu D", mom.id)
	const momCategory7 = await createCategoryDb("Adverbes – F zu D", mom.id)

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

	const momCards1 = processArray(generalVocabGermanToFrench)
	momCards1.forEach(card => {
		card.setCategory(momCategory1.id)
		card.setOwner(mom.id)
	})

	const momCards2 = processArray(generalVocabFrenchToGerman)
	momCards2.forEach(card => {
		card.setCategory(momCategory2.id)
		card.setOwner(mom.id)
	})

	const momCards3 = processArray(verbsGermanToFrench)
	momCards3.forEach(card => {
		card.setCategory(momCategory3.id)
		card.setOwner(mom.id)
	})

	const momCards4 = processArray(verbsFrenchToGerman)
	momCards4.forEach(card => {
		card.setCategory(momCategory4.id)
		card.setOwner(mom.id)
	})

	const momCards5 = processArray(adjectivesGermanToFrench)
	momCards5.forEach(card => {
		card.setCategory(momCategory5.id)
		card.setOwner(mom.id)
	})

	const momCards6 = processArray(adjectivesFrenchToGerman)
	momCards6.forEach(card => {
		card.setCategory(momCategory6.id)
		card.setOwner(mom.id)
	})

	const momCards7 = processArray(adverbsFrenchToGerman)
	momCards7.forEach(card => {
		card.setCategory(momCategory7.id)
		card.setOwner(mom.id)
	})

	const cards1 = await prisma.card.createMany({ data: momCards1 })
	console.log(cards1)
	const cards2 = await prisma.card.createMany({ data: momCards2 })
	console.log(cards2)
	const cards3 = await prisma.card.createMany({ data: momCards3 })
	console.log(cards3)
	const cards4 = await prisma.card.createMany({ data: momCards4 })
	console.log(cards4)
	const cards5 = await prisma.card.createMany({ data: momCards5 })
	console.log(cards5)
	const cards6 = await prisma.card.createMany({ data: momCards6 })
	console.log(cards6)
	const cards7 = await prisma.card.createMany({ data: momCards7 })
	console.log(cards7)

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
