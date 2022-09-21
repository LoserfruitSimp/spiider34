import scrape from 'website-scraper'; // only as ESM, no CommonJS

const options = {
  urls: ['http://rule34.xxx/'],
  directory: '../save/'
};

// with promise
scrape(options).then((result) => {
  console.log(result)
});