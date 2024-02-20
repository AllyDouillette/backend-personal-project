export class User {
  constructor (email, password) {
    this.email = email
    this.password = password
  }
}

export class Category {
  constructor (name = 'untitled') {
    this.name = name
  }

  setOwner
}

export class Card {
  constructor (prompt, answer, hint = '') {
    this.prompt = prompt
    this.answer = answer
    this.hint = hint
  }

  setCategory (id) {
    this.categoryId = id
  }

  setUser (uuid) {
    this.userUUID = uuid
  }
}
