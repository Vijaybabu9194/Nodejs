const http = require("http");

const server = http.createServer(function (request, response) {
  response.writeHead(200, {
    "content-type": "text/html",
  });
  switch (request.url) {
    case "/foo":
      response.end("foo path");
      return;
    case "/bar":
      response.end("bar path");
      return;
    default:
      response.end(`no implementation for ${request.url}`);
  }
});

server.listen(5001);
