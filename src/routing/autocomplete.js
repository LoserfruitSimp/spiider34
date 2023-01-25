const express = require("express");
const https = require("https");
const fileRouter = express.Router();
const axios = require("axios").default;

fileRouter.get("/", function (req, res) {
  if (!req.query.url) res.sendStatus(404);

  if (req.query.sourse === "gelbooru") {
    
  } else if (req.query.sourse === "hypnohub" || req.query.sourse === "rule34") {
    axios
      .get("https://" + req.query.sourse + "/public/autocomplete.php?q=" + req.query.q)
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message);
      });
  } else {
    axios
      .get("https://" + req.query.sourse + "/autocomplete.php?q=" + req.query.q)
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message);
      });
  }

  res.json(data);
});

module.exports = fileRouter;
