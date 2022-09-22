const express = require("express");
const scraper = require("../misc/scraper");
const commentRouter = express.Router();

commentRouter.get("/", function (req, res) {
  var baseURI = "";
  if (req.baseUrl.substring(7) == "hypnoh") {
    baseURI = "https://hypnohub.net";
  } else {
    baseURI = "https://rule34.xxx";
  }

  const baseUrl = baseURI + "/index.php?page=dapi&s=post&q=index";
  let url = baseUrl;

  if (req.query.post_id) {
    url += "&post_id=" + req.query.post_id;
  }

  scraper(
    url,
    function ($) {
      return $("comment")
        .map(function () {
          let result = this.attribs;
          result.post_url = process.env.HOST + "/posts/" + req.baseUrl.substring(7) + "?id=" + result.post_id;
          return result;
        })
        .get();
    },
    function (comments) {
      res.json(comments);
    }
  );
});

module.exports = commentRouter;
