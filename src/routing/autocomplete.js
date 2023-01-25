const express = require("express");
const https = require("https");
const fileRouter = express.Router({ mergeParams: true });
const axios = require("axios").default;

fileRouter.get("/", async function (req, res) {
  if (req.query.sourse === "gelbooru.com") {
    const response = await axios.get(
      "https://" +
        req.query.sourse +
        "/index.php?page=autocomplete2&term=" +
        req.query.q +
        "&type=tag_query&limit=10"
    );
    
    let data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        label:
          response.data[i].label + " (" + response.data[i].post_count + ")",
        value: response.data[i].value,
      });
    }
    
    res.json(data);
  } else if (
    req.query.sourse === "hypnohub.net" ||
    req.query.sourse === "rule34.xxx"
  ) {
    axios
      .get(
        "https://" +
          req.query.sourse +
          "/public/autocomplete.php?q=" +
          req.query.q
      )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        res.send(error.message);
      });
  } else {
    axios
      .get("https://" + req.query.sourse + "/autocomplete.php?q=" + req.query.q)
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        res.send(error.message);
      });
  }
});

module.exports = fileRouter;
