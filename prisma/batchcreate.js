import { PrismaClient } from "@prisma/client"
import { Card } from "../src/helper/constructors.js"

const prisma = new PrismaClient
const batchcreate = async (cardArray) => {
	try {
		const categoryId = 0
		const ownerId = "fe158a4f-b448-4b3d-9339-c4261cd42f22"
		const Cards = cardArray.map(card => {
			const result = new Card(card[0], card[1], card[2])
			result.setCategory(categoryId)
			result.setOwner(ownerId)
			return result
		})
		const created = await prisma.card.createMany({ data: Cards })
		console.log(created)
	} catch (error) {
		console.log(error, "error creating cards")
	}
}

await batchcreate()
