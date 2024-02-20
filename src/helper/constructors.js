export class User {
  constructor (email, password) {
    this.email = email
    this.password = password
  }
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
}
