const http = require("http");
const express = require("express");

const app = express();
const port = process.env.APP_PORT || 90;

app.use("/github", require("./src/github"));

app.get("/health", (req, res) => res.send("Staying alive!").end());
app.get("/", (req, res) => res.send("Hello world").end());

http.createServer(app).listen(port, () => {
  console.log("Server listening on port", port);
});
