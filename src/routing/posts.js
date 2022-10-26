const express = require("express");
const scraper = require("../misc/scraper");
const parse = require("xml-parser");
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
  const pid = req.query.pid
  
  let baseURI = "";
  for (var i = 0; i < urls.length; i++) {
    if (urls[i].includes(cite)) {
      baseURI = urls[i];
      break;
    }
  }
  
  const data = await getData(req, pid)
  console.log(data)

  })
  
//     scraper(
  //     url,
  //     function ($) {
  //       return $("post")
  //         .map(function () {
  //           let result = this.attribs;

  //           // get comments url
  //           result.comments_url =
  //             host + "/comments/" + cite + "?post_id=" + result.id;

  //           // convert tags
  //           result.tags = result.tags.split(" ").filter((tag) => tag !== "");
  //           result.tags.filter(function (item, pos) {
  //             return result.tags.indexOf(item) == pos;
  //           });

  //           // get type
  //           if (
  //             result.file_url.endsWith(".webm") ||
  //             result.file_url.endsWith(".mp4")
  //           ) {
  //             result.type = "video";
  //           } else {
  //             result.type = "image";
  //           }
  //           //modify urls
  //           result.file_url =
  //             host +
  //             "/files/" +
  //             req.baseUrl.substring(7) +
  //             "?url=" +
  //             result.file_url;
  //           result.preview_url =
  //             host +
  //             "/files/" +
  //             req.baseUrl.substring(7) +
  //             "?url=" +
  //             result.preview_url;
  //           result.sample_url =
  //             host +
  //             "/files/" +
  //             req.baseUrl.substring(7) +
  //             "?url=" +
  //             result.sample_url;
  //           result.creator_url =
  //             baseURI +
  //             "/index.php?page=account&s=profile&id=" +
  //             result.creator_id;
  //           return result;
  //         })
  //         .get();
  //     },
  //     function (comments) {
  //       res.json(comments);
  //     }
  //   );
//});

async function getData(req, idx) {
  const cite = req.query.sourse;

  let baseURI = "";
  for (var i = 0; i < urls.length; i++) {
    if (urls[i].includes(cite)) {
      baseURI = urls[i];
      break;
    }
  }

  const response = await axios.get(
    "https://" +
      baseURI +
      "/index.php?page=dapi&s=post&q=index&tags=" +
      req.query.tags +
      "&pid=" +
      idx,
    "text/xml"
  );
  
  return parse(response.data).root;
}

module.exports = postRouter;
