import { randomUUID } from "node:crypto"

class Task {
  constructor(title, description) {
    this.id = randomUUID()
    this.title = title
    this.description = description
    this.completed_at = null
    this.created_at = new Date().toJSON()
    this.updated_at = null
  }
}

export default Task
