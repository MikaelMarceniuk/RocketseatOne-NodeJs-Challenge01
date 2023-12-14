import fs from "node:fs/promises"

const dbDataUrl = new URL("dbData.json", import.meta.url)

class Database {
  #database = {}

  constructor() {
    fs.readFile(dbDataUrl, "utf8")
      .then((data) => (this.#database = JSON.parse(data)))
      .catch(() => this.#persist())
  }

  #persist() {
    fs.writeFile(dbDataUrl, JSON.stringify(this.#database, null, 2))
  }

  #findById(table, id) {
    const dbTaskIndex = this.#database[table].findIndex((p) => p.id == id)
    if (dbTaskIndex == -1) throw new Error(`Task not found with id ${id}`)

    return dbTaskIndex
  }

  select(table) {
    return this.#database[table] ?? []
  }

  insert(table, data) {
    Array.isArray(this.#database[table])
      ? this.#database[table].push(data)
      : (this.#database[table] = [data])

    this.#persist()
  }

  update(table, id, data) {
    const dbTaskIndex = this.#findById(table, id)

    const row = this.#database[table][dbTaskIndex]
    this.#database[table][dbTaskIndex] = {
      ...row,
      ...data,
      updated_at: new Date().toJSON(),
    }
    this.#persist()
  }

  delete(table, id) {
    const dbTaskIndex = this.#findById(table, id)

    this.#database[table].splice(dbTaskIndex, 1)
    this.#persist()
  }
}

export default new Database()
