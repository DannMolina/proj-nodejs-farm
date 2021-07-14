////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////
// * core modules
const fs = require("fs");
const http = require("http");
const url = require("url");
// * own module
const replaceTemplate = require("./modules/replaceTemplate");

////////////////////////////////////////////
// SERVER
////////////////////////////////////////////

// * front-end
const tempOverview = fs.readFileSync(
  `${__dirname}/template/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/template/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/template/template-product.html`,
  "utf-8"
);

// * data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // * Overview page
  if (pathname === "/" || pathname === "overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    // * display
    res.end(output);

    // * Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    // * display
    res.end(output);

    // * API
  } else if (pathname === "/api") {
    // * header
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    // * display
    res.end(data);

    // * Not found
  } else {
    // * header
    res.writeHead(404, {
      "Content-type": "text/html",
      header: "This is a node app",
    });
    // * display
    res.end("<h1>Page not found!</h1>");
  }
});

// * port 8000 && host 127.0.0.1
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
