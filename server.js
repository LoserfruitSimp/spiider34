const path = require("path");
const postRouter = require('./routing/posts');
const imageRouter = require("./routing/images");
const commentRouter = require('./routing/comments');

const port = process.env.PORT

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

console.log(process.env)
app.use('/posts/:type', postRouter);
app.use("/images/:type", imageRouter);
app.use('/comments/:type', commentRouter);
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/pages/index.html'));
});

app.get('/p/:type', function(req, res) {
  console.log(req.params)
  res.sendFile(path.join(__dirname, '/src/pages/viewer.html'));
});

app.listen(port, function () {
  console.log('App listening on port ' + port + '.');
});