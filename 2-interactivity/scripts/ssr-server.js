require("svelte/register");
const App = require("../src/App.svelte").default;
const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

const options = {
  hostname: 'www.recipepuppy.com',
  port: 80,
  path: '/api/',
  method: 'GET'
}

const indexContent = fs.readFileSync(
  path.resolve(__dirname, "..", "public", "index.html")
);

console.log("Starting the server...");

const req = http.request(options, res => {
  let data = "";
  res.setEncoding('utf8');
  res.on('data', chunk => {
    data += chunk
  });

  res.on('end', () => {
    const recipes = JSON.parse(data).results;
    const { html, css } = App.render({
      recipes
    });

    app.get('/', (_, res) => {
      res.send(
        indexContent
          .toString()
          .replace(
            '<body></body>',
            `<script>window.__RECIPES__=${JSON.stringify(recipes)}</script><style>${css.code}</style><body>${html}</body>`
          )
      );
    });

    app.use(
      '/',
      express.static(path.resolve(__dirname, `../public`))
    );

    app.listen(3000, () => console.log("The server started at localhost:3000"));
  })

}).end();
