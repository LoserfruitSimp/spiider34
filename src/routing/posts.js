const express = require("express");
const postRouter = express.Router({ mergeParams: true });
const host = "https://" + process.env.PROJECT_DOMAIN + ".glitch.me";
const axios = require("axios").default;
var parseString = require("xml2js").parseString;

const urls = [
  "rule34.xxx",
  "hypnohub.net",
  "safebooru.org",
  "realbooru.com",
  "xbooru.com",
  "gelbooru.com",
];

// List of urls that dont display the URL to file when using JSON request
const XMLhash = ["safebooru.org", "realbooru.com", "xbooru.com"];

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

  let data = [];

  if (XMLhash.find((e) => e === baseURI)) {
    // XML 
    const api = await axios.get(
      "https://" +
        baseURI +
        "/index.php?page=dapi&s=post&q=index&tags=" +
        req.query.tags +
        "&pid=" +
        pid / 100 +
        "&json=0",
      "text/xml"
    ).catch(e=>{
      console.log(e)
    });
    
    console.log(api.data)
    parseString(api.data, function (err, result) {
      for (let i = 0; i < result.posts.post.length; i++) result.posts.post[i] = result.posts.post[i].$
      data = result.posts.post;
    });
  } else {
    // JSON
    const api = await axios.get(
      "https://" +
        baseURI +
        "/index.php?page=dapi&s=post&q=index&tags=" +
        req.query.tags +
        "&pid=" +
        pid / 100 +
        "&json=1",
      "application/json"
    );

    data = api.data;
  }

  res.json(data);
});

module.exports = postRouter;
