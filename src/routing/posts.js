const postRouter = require("express").Router({ mergeParams: true });
var parseString = require("xml2js").parseString;
const axios = require("axios").default;

const urls = require('../../sources.json');

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
  const api = await axios.get(
    "https://" +
    baseURI +
    "/index.php?page=dapi&s=post&q=index&tags=" +
    req.query.tags +
    "&pid=" +
    pid / 100 +
    "&json=0",
    "text/xml"
  ).catch(e => {
    console.log(e)
  });

  let total = 0
  parseString(api.data, function (err, result) {
    if (result.posts.post) {
      for (let i = 0; i < result.posts.post.length; i++) result.posts.post[i] = result.posts.post[i].$
      data = result.posts.post;
    } else {
      data = []
    }
    total = new Number(result.posts.$.count)
  });

  res.json({
    total: total,
    data: data
  });
});

module.exports = postRouter;
