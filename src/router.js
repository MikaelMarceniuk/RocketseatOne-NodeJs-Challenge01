import buildRoutePath from "./utils/buildRoutePath.js"
import Database from "./db/index.js"
import Task from "./models/task.js"
import removeUndefinedFromObject from "./utils/removeUndefinedFromObject.js"

const taskTable = "tasks"

export default [
  {
    method: "GET",
    url: buildRoutePath("/ping"),
    handler: (_, res) => res.end("Hello world!"),
  },
  {
    method: "GET",
    url: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.query

      const filters = { title, description }
      removeUndefinedFromObject(filters)

      const dbTasks = Database.select(taskTable, filters)
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

      const newTask = { title, description }
      removeUndefinedFromObject(newTask)

      Database.update(taskTable, id, newTask)

      res.end()
    },
  },
  {
    method: "PATCH",
    url: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params
      const { data } = Database.findById(taskTable, id)

      const completed_at = !data.completed_at ? new Date().toJSON() : null
      Database.update(taskTable, id, { completed_at })

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
