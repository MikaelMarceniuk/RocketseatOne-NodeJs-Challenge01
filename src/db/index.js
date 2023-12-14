import fs from "node:fs/promises"

const dbDataUrl = new URL("dbData.json", import.meta.url)

class Database {
  #database = {}

  constructor() {
    fs.readFile(dbDataUrl, "utf8")
      .then((data) => this.#database.data)
      .catch(() => this.#persist())
  }

  #persist() {
    fs.writeFile(dbDataUrl, JSON.stringify(this.#database, null, 2))
  }
}

export default new Database()
