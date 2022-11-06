const express = require("express");
const postRouter = express.Router({ mergeParams: true });
const host = "https://" + process.env.PROJECT_DOMAIN + ".glitch.me";
const axios = require("axios").default;

const urls = [
  "rule34.xxx",
  "hypnohub.net",
  "safebooru.org",
  "realbooru.com",
  "xbooru.com",
];

postRouter.get("/", async function (req, res) {
  const cite = req.query.sourse;
  const pid = req.query.pid;

  let baseURI = "";
  for (var i = 0; i < urls.length; i++) {
    if (urls[i].includes(cite)) {
      baseURI = urls[i];
      break;
    }
  }
  
  const api = await axios.get(
      "https://" +
        baseURI +
        "/index.php?page=dapi&s=post&q=index&tags=" +
        req.query.tags +
        "&pid=" +
        pid / 100 +
        "&json=1",
      "application/json"
    )
  
  res.json(api.data);
});

module.exports = postRouter;