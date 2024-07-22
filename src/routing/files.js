const fileRouter = require('express').Router();
const https = require('https');

fileRouter.get('/', function (req, res) {
    if (!req.query.url) res.sendStatus(404);

    const request = https.get(req.query.url, function(response) {
        res.setHeader('Content-Type', response.headers['content-type']);
        response.pipe(res);
    });

    request.on('error', function(e){
        console.error(e);
    });
});

module.exports = fileRouter;