import buildRoutePath from "./utils/buildRoutePath.js"
import Database from "./db/index.js"
import Task from "./models/task.js"
import removeUndefinedFromObject from "./utils/removeUndefinedFromObject.js"
import OperationalError from "./utils/operationalError.js"

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
      try {
        const { title, description } = req.query

        const filters = { title, description }
        removeUndefinedFromObject(filters)

        const dbTasks = Database.select(taskTable, filters)
        res.end(JSON.stringify(dbTasks))
      } catch (e) {
        if (e instanceof OperationalError) {
          return res
            .writeHead(e.httpCode)
            .end(JSON.stringify({ msg: e.description }))
        }

        res.writeHead(500).end(e.toString())
      }
    },
  },
  {
    method: "POST",
    url: buildRoutePath("/tasks"),
    handler: (req, res) => {
      try {
        const { title, description } = req.body

        if (!title || title == "")
          throw new OperationalError(
            `Task title must not be undefined or empty`,
            true,
            400
          )

        if (!description || description == "")
          throw new OperationalError(
            `Task description must not be undefined or empty`,
            true,
            400
          )

        const newTask = new Task(title, description)

        Database.insert(taskTable, newTask)

        res.writeHead(201).end()
      } catch (e) {
        if (e instanceof OperationalError) {
          return res
            .writeHead(e.httpCode)
            .end(JSON.stringify({ msg: e.description }))
        }

        res.writeHead(500).end(e.toString())
      }
    },
  },
  {
    method: "PUT",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      try {
        const { id } = req.params
        const { title, description } = req.body

        const newTask = { title, description }
        removeUndefinedFromObject(newTask)

        Database.update(taskTable, id, newTask)

        res.end()
      } catch (e) {
        if (e instanceof OperationalError) {
          return res
            .writeHead(e.httpCode)
            .end(JSON.stringify({ msg: e.description }))
        }

        res.writeHead(500).end(e.toString())
      }
    },
  },
  {
    method: "PATCH",
    url: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      try {
        const { id } = req.params
        const { data } = Database.findById(taskTable, id)

        const completed_at = !data.completed_at ? new Date().toJSON() : null
        Database.update(taskTable, id, { completed_at })

        res.end()
      } catch (e) {
        if (e instanceof OperationalError) {
          return res
            .writeHead(e.httpCode)
            .end(JSON.stringify({ msg: e.description }))
        }

        res.writeHead(500).end(e.toString())
      }
    },
  },
  {
    method: "DELETE",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      try {
        const { id } = req.params

        Database.delete(taskTable, id)

        res.end()
      } catch (e) {
        if (e instanceof OperationalError) {
          return res
            .writeHead(e.httpCode)
            .end(JSON.stringify({ msg: e.description }))
        }

        res.writeHead(500).end(e.toString())
      }
    },
  },
]
