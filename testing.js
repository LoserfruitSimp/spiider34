const scraper = require('website-scraper');

const options = {
  urls: ['http://rule34.xxx/'],
  directory: '../save/'
};

// with promise
scraper(options).then((result) => {
  console.log(result)
});