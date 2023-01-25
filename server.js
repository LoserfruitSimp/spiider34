const path = require("path");
const postRouter = require("./src/routing/posts");
const fileRouter = require("./src/routing/files");
const autocompleteRouter = require("./src/routing/autocomplete");

const port = process.env.PORT;

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use("/posts", postRouter);
app.use("/files", fileRouter);
app.use("/autocomplete", autocompleteRouter);
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/src/pages/index.html"));
});

app.get("/p", function (req, res) {
  res.sendFile(path.join(__dirname, "/src/pages/viewer.html"));
});

app.listen(port, function () {
  console.log("App listening on port " + port + ".");
});
