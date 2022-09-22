const path = require("path");
const postRouter = require('./routing/posts');

const port = process.env.PORT
const host = "0.0.0.0"

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


app.use('/posts', postRouter);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/pages/index.html'));
});

app.listen(port, function () {
  console.log('App listening on port ' + port + '.');
});