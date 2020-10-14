const http = require("http");
const express = require("express");

const testRouter = require("./src/test.router");

const app = express();
const port = process.env.BM_PORT || 90;

app.get(
    "/health",
    (req, res) => res.send("Staying alive!").end()
);

app.use("/", testRouter);

http.createServer(app).listen(port, () => {
    console.log("Server listening on port", port);
});