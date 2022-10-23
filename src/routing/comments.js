const express = require("express");
const scraper = require("../misc/scraper");
const commentRouter = express.Router({ mergeParams: true });
const urls = ["rule34.xxx", "hypnohub.net", "safebooru.org", "realbooru.com", "xbooru.com"]

commentRouter.get("/", function (req, res) {
 const cite = req.query.sourse;

  let baseURI = ""
  for (var i = 0; i < urls.length; i++) {
    if (urls[i].includes(cite)) {
      baseURI = urls[i];
      break;
    }
  }
  
  const baseUrl = "https://" + baseURI + "/index.php?page=dapi&s=post&q=index";
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
