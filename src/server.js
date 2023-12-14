import http from "node:http"
import router from "./router.js"

const server = http.createServer((req, res) => {
  const { method, url } = req
  console.log(method, url)

  const route = router.find((r) => r.method == method && r.url.test(url))
  if (route) return route.handler(req, res)

  res.writeHead(404).end()
})

server.listen(3333, () => console.log("Server is up and running on port 3333"))
