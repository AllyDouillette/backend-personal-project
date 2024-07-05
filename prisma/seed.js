import { PrismaClient } from "@prisma/client"
import { Card } from "../src/helper/constructors.js"
import  { createUserDb } from "../src/domain/user.js"
import { User } from "../src/helper/constructors.js"
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
import { createStatisticDb, updateStatisticDb } from "../src/domain/statistic.js"
const prisma = new PrismaClient()

async function seed () {
	// create multiple users
	const mom = await createUserDb("hummel", "susnoy@gmx.de", "fleißigesbienchen")
	const demoAccount = await createUserDb("DemoDomino", "rebecca.noy@gmx.de", "lernmausi")

	const statistic1 = await createStatisticDb(mom.id, new Date(new Date(2023,10,29).setUTCHours(0,0,0,0)).toISOString())
	const statistic2 = await createStatisticDb(mom.id, new Date(new Date(2024,0,1).setUTCHours(0,0,0,0)).toISOString())

	console.log(statistic1)
	console.log(statistic2)

	const updatedStatistic1 = await updateStatisticDb(statistic1.id, 20, 9)
	const updatedStatistic2 = await updateStatisticDb(statistic2.id, 4, 10)

	console.log(updatedStatistic1)
	console.log(updatedStatistic2)

	let users = []
	for (let i = 0; i < 5; i++) {
		const randomUser = new User()
		randomUser.role = "USER"
		randomUser.password = await hashString(randomUser.password)
		users.push(randomUser)
	}

	await createUserDb("admin", "", "letmeinI'manAdmin", "ADMIN")

	const momCategory1 = await createCategoryDb("Vocabulaire générale – D zu F", mom.id)
	const momCategory2 = await createCategoryDb("Vocabulaire générale – F zu D", mom.id)
	const momCategory3 = await createCategoryDb("Verbes – D zu F", mom.id)
	const momCategory4 = await createCategoryDb("Verbes – F zu D", mom.id)
	const momCategory5 = await createCategoryDb("Adjectives – D zu F", mom.id)
	const momCategory6 = await createCategoryDb("Verbes – F zu D", mom.id)
	const momCategory7 = await createCategoryDb("Adverbes – F zu D", mom.id)

	const randLevel = () => Math.min(parseInt(Math.random() * 11), 10)
	const randDate = () => {
		const milliSecondsInYear = 1000 * 60 * 60 * 24 * 365
		const randomTime = parseInt(Math.random() * milliSecondsInYear)
		const date = new Date(new Date().setTime(new Date().getTime() - randomTime))
		return date.toISOString()
	}
	const randReps = (level) => level + parseInt(Math.random() * 5)

	const momCategories = [momCategory1, momCategory2, momCategory3, momCategory4, momCategory5, momCategory6, momCategory7]
	const momCardArrays = [generalVocabGermanToFrench, generalVocabFrenchToGerman, verbsGermanToFrench, verbsFrenchToGerman, adjectivesGermanToFrench, adjectivesFrenchToGerman, adverbsFrenchToGerman]

	const processedCardArrays = momCardArrays.map((cardArray, index) => {
		const category = momCategories[index]
		const newCardArray = processArray(cardArray)
		newCardArray.forEach((card) => {
			card.setCategory(category.id)
			card.setOwner(mom.id)
			card.level = randLevel()
			if (card.level > 0) {
				card.lastAskedAt = randDate()
			}
			card.repetitions = randReps(card.level)
		})
		return newCardArray
	})

	const batchCreate = async (cards) => {
		const createdCards = await prisma.card.createMany({ data: cards })
		console.log(createdCards)
	}

	await Promise.allSettled(processedCardArrays.map(cardarray => batchCreate(cardarray)))

	const demoCategory = await createCategoryDb("Assorted facts", demoAccount.id)
	const demoCards = [
		new Card("Who composed the Windows 95 startup melody?", "Brian Eno. (Funnily enough, he composed it with his Macintosh)", "He was a member of the 70s band \"Roxy Music\" and went on to specialize in so-called \"Ambient Music\"."),
		new Card("What is Taylor Swift's middle name?", "Alison", "The company used to manage her rights to trademarks, logos and the like bears her initials: TAS Rights Management LLC"),
		new Card("David Bowie shared a birthday with another famous musician. Which one?", "Elvis Presley", "Coincidentally, the other musician was twelve years older than Bowie and a childhood influence due to his iconic influence on Rock'n'Roll."),
		new Card("In the 2005 film adaptation of \"Harry Potter and the Goblet of Fire\", the rock group \"Weird Sisters\" playing the Yule Ball is played by real-life famous musicians. Which ones?", "Vocals: Jarvis Cocker, bass: Steve Mackey (both from Pulp); guitar: Jonny Greenwood, drums: Phil Selway (both from Radiohead), rhythm guitar: Jason Buckle (All Seeing I), keyboards and bagpipes: Steven Claydon (Add N to (X))", "They're from different bands in real life.")
	]

	const processedDemoCards = demoCards.map((card) => {
		card.setOwner(demoAccount.id)
		card.setCategory(demoCategory.id)
		card.level = randLevel()
		card.level = randLevel()
		if (card.level > 0) {
			card.lastAskedAt = randDate()
		}
		card.repetitions = randReps(card.level)
		return card
	})

	try {
		const cards =	await prisma.card.createMany({ data: processedDemoCards })
		console.log(cards)
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
