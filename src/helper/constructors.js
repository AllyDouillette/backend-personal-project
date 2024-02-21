import { generateUsername } from "unique-username-generator";

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

export class Card {
	constructor (prompt = generateUsername("", 0,10), answer = generateUsername("", 0, 10), hint = "") {
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
