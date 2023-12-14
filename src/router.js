import buildRoutePath from "./utils/buildRoutePath.js"

export default [
  {
    method: "GET",
    url: buildRoutePath("/ping"),
    handler: (req, res) => res.end("Hello world!"),
  },
  {
    method: "GET",
    url: buildRoutePath("/tasks"),
    handler: (req, res) => {
      res.end("Found method GET of task resource")
    },
  },
  {
    method: "POST",
    url: buildRoutePath("/tasks"),
    handler: (req, res) => {
      res.end("Found method POST of task resource")
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
