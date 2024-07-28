const fileRouter = require("express").Router({ mergeParams: true });
const axios = require("axios").default;

fileRouter.get("/", async function (req, res) {
  try {
    if (req.query.source === "gelbooru.com") {
      const response = await axios.get(
        "https://" +
        req.query.source +
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
      req.query.source === "hypnohub.net" ||
      req.query.source === "rule34.xxx"
    ) {
      axios
        .get(
          "https://" +
          req.query.source +
          "/public/autocomplete.php?q=" +
          req.query.q
        )
        .then(function (response) {
          res.json(response.data);
        })
    } else {
      axios
        .get("https://" + req.query.source + "/autocomplete.php?q=" + req.query.q)
        .then(function (response) {
          res.json(response.data);
        })
        .catch(function (error) {
          res.send(error.message);
        });
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = fileRouter;
