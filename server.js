const path = require("path");
const postRouter = require("./src/routing/posts");
const fileRouter = require("./src/routing/files");
const commentRouter = require("./src/routing/comments");

const port = process.env.PORT;

const axios = require("axios").default;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use("/posts", postRouter);
app.use("/files", fileRouter);
app.use("/comments", commentRouter);
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/src/pages/index.html"));
});

app.get("/p", function (req, res) {
  res.sendFile(path.join(__dirname, "/src/pages/viewer.html"));
});

app.get("/autocomplete", function (req, res) {
  axios
    .get("https://" + req.query.sourse + "/public/autocomplete.php?q=" + req.query.q)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error.message);
    });
});

app.listen(port, function () {
  console.log("App listening on port " + port + ".");
});
