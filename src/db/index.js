import fs from "node:fs/promises"
import OperationalError from "../utils/operationalError.js"

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

  findById(table, id) {
    const dbTaskIndex = this.#database[table].findIndex((p) => p.id == id)
    if (dbTaskIndex == -1)
      throw new OperationalError(
        "O registro nao existe com o id passado.",
        true,
        404
      )

    return {
      index: dbTaskIndex,
      data: this.#database[table][dbTaskIndex],
    }
  }

  select(table, filters) {
    let dbData = this.#database[table] ?? []

    if (Object.keys(filters).length > 0) {
      dbData = dbData.filter((row) => {
        return Object.entries(filters).some(([key, value]) =>
          row[key].toLowerCase().includes(value.toLowerCase())
        )
      })
    }

    return dbData
  }

  insert(table, data) {
    Array.isArray(this.#database[table])
      ? this.#database[table].push(data)
      : (this.#database[table] = [data])

    this.#persist()
  }

  update(table, id, data) {
    const { index } = this.findById(table, id)

    const row = this.#database[table][index]
    this.#database[table][index] = {
      ...row,
      ...data,
      updated_at: new Date().toJSON(),
    }
    this.#persist()
  }

  delete(table, id) {
    const { index } = this.findById(table, id)

    this.#database[table].splice(index, 1)
    this.#persist()
  }
}

export default new Database()
