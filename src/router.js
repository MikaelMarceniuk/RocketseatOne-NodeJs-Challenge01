import buildRoutePath from "./utils/buildRoutePath.js"
import Database from "./db/index.js"
import Task from "./models/task.js"

const taskTable = "tasks"

export default [
  {
    method: "GET",
    url: buildRoutePath("/ping"),
    handler: (req, res) => res.end("Hello world!"),
  },
  {
    method: "GET",
    url: buildRoutePath("/tasks"),
    handler: (_, res) => {
      const dbTasks = Database.select(taskTable)
      res.end(JSON.stringify(dbTasks))
    },
  },
  {
    method: "POST",
    url: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body
      const newTask = new Task(title, description)

      Database.insert(taskTable, newTask)

      res.writeHead(201).end()
    },
  },
  {
    method: "PUT",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      Database.update(taskTable, id, { title, description })

      res.end()
    },
  },
  {
    method: "PATCH",
    url: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params

      Database.update(taskTable, id, { completed_at: new Date().toJSON() })

      res.end()
    },
  },
  {
    method: "DELETE",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params

      Database.delete(taskTable, id)

      res.end()
    },
  },
]
