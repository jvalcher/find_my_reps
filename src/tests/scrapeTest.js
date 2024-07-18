import { scrapeImages } from '../viewUtils.js';


const ratio = {
  fetched: "_",
  total: "_",
  string: "_ / _"
};

const qarr = [ 'Jeb Bush', 'Emperor Hirohito' ];

let images = await scrapeImages (qarr, ratio);

console.log (images);

