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

  select(table) {
    return this.#database[table] ?? []
  }

  insert(table, data) {
    Array.isArray(this.#database[table])
      ? this.#database[table].push(data)
      : (this.#database[table] = [data])

    this.#persist()
  }
}

export default new Database()
