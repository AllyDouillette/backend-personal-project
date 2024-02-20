import { v4 as uuidv4 } from 'uuid';

export default class User {
  constructor (email, password) {
    this.email = email
    this.password = password
  }
}
