import buildRoutePath from "./utils/buildRoutePath.js"
import Database from "./db/index.js"
import Task from "./models/task.js"

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
      const dbTasks = Database.select("tasks")
      res.end(JSON.stringify(dbTasks))
    },
  },
  {
    method: "POST",
    url: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body
      const newTask = new Task(title, description)

      Database.insert("tasks", newTask)

      res.writeHead(201).end()
    },
  },
  {
    method: "PUT",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      res.end("Found method PUT of task resource")
    },
  },
  {
    method: "PATCH",
    url: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      res.end("Found method PATCH of task resource")
    },
  },
  {
    method: "DELETE",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      res.end("Found method DELETE of task resource")
    },
  },
]
