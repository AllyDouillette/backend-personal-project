import { generateUsername } from "unique-username-generator"
import { LoremIpsum } from "lorem-ipsum"

export class User {
	constructor (username = generateUsername("", 0,20), password = generateUsername("", 10,20)) {
		this.username = username
		this.password = password
	}
}

export class Category {
	constructor (name = "untitled") {
		this.name = name
	}

	setOwner (id) {
		this.ownerId = id
	}
}

const loremIpsum = new LoremIpsum({
	sentencesPerParagraph: {
		max: 8,
		min: 4
	},
	wordsPerSentence: {
		max: 16,
		min: 4
	}
})

export class Card {
	constructor (prompt = loremIpsum.generateSentences(3), answer = loremIpsum.generateSentences(3), hint = "") {
		this.prompt = prompt
		this.answer = answer
		this.hint = hint
	}

	setCategory (id) {
		this.categoryId = id
	}

	setOwner (id) {
		this.ownerId = id
	}
}
