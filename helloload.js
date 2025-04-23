import http from "http";

const server = http.createServer((req, res) => {
  let body = "<h1>Oh,mybug!</h1>";
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(body);
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});
