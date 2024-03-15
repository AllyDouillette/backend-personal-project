import { PrismaClient } from "@prisma/client"
import { Card } from "../src/helper/constructors.js"
import  { createUserDb, getUserByUsername } from "../src/domain/user.js"
import { getCardsFromOwnerDb } from "../src/domain/card.js"
import { createCategoryDb, getCategoriesDb } from "../src/domain/category.js"
import { createStatisticDb, updateStatisticDb } from "../src/domain/statistic.js"
import { randDate, randInt, randLevel, randReps } from "../src/helper/helper.js"
const prisma = new PrismaClient()

async function seed () {
	let demoAccount
	try {
		const search = await getUserByUsername("DemoDomino")
		if (search.id) {
			demoAccount = search
		} else {
			demoAccount = await createUserDb("DemoDomino", "lernmausi")
		}
	} catch (error) {
		console.log(error, "error finding the demo user")
	}
	console.log(demoAccount)

  const deleteCards = await prisma.card.deleteMany({
    where: {
      ownerId: demoAccount.id
    }
  })
  console.log("deleted Cards", deleteCards)

  const deleteCategory = await prisma.category.deleteMany({
    where: {
      ownerId: demoAccount.id
    }
  })
  console.log("deleted categories", deleteCategory)

  const deleteStatistic = await prisma.statistic.deleteMany({
    where: {
      userId: demoAccount.id
    }
  })
  console.log("deleted statistics", deleteStatistic)

  for (let i = 0; i < 5; i++) {
    const randomAmountOfDays = randInt(1, 365*2)
    const milliSecondsInDay = 1000 * 60 * 60 * 24
    const randomDate = new Date().setUTCHours(0,0,0,0) - randomAmountOfDays * milliSecondsInDay
	  const statistic = await createStatisticDb(demoAccount.id, new Date(randomDate).toISOString())
	  await updateStatisticDb(statistic.id, randInt(1, 50), randInt(1, 50))
  }
  const statistics = await prisma.statistic.findMany({
    where: {
      userId: demoAccount.id
    }
  })
  console.log("user statistics count", statistics.length)

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
		console.log("created cards", cards)
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
