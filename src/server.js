import http from "node:http"
import router from "./router.js"
import extractQueryParams from "./utils/extractQueryParams.js"

const server = http.createServer((req, res) => {
  const { method, url } = req
  console.log(method, url)

  const route = router.find((r) => r.method == method && r.url.test(url))
  if (route) {
    const { query, ...params } = url.match(route.url).groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  res.writeHead(404).end()
})

server.listen(3333, () => console.log("Server is up and running on port 3333"))
