const fs = require("fs");
const http = require("http");
const url = require("url");

////////////////////////////////////////////
// SERVER
////////////////////////////////////////////

const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;
  if (pathName === "/" || pathName === "overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      header: "This is a node app",
    });
    res.end("<h1>Page not found!</h1>");
  }
  res.end("Hello from the server!");
});

// * port 8000 && host 127.0.0.1
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
