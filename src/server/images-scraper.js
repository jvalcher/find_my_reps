// Too slow

import Scraper from 'images-scraper';

export const fetchRepImgUrls = async (repData) => {

    // create title, rep strings for query array
    let repQueries = [];
    for (const key of Object.keys(repData.reps)) {
        for (const rep of repData.reps[key]) {
            const title = Object.keys(rep)[0];
            const name = Object.values(rep)[0];
            repQueries.push(`${title} ${name}`);
        }
    }

    const google = new Scraper({
      puppeteer: {
        headless: true,
      },
    });

    const results = google.scrape(repQueries, 1);
    
    return results;

    /*
    // append urls to repData
    for await (const rep of results) {
        for (const key of Object.keys(repData.reps)) {
            for (const i in repData.reps[key]) {
                const name = Object.values(repData.reps[key][i]);
                if (rep.query.includes(name)) {
                    repData.reps[key][i].url = rep.images[0].url;
                }
            }
        }
    }
    return repData;
    */
}

const myScrape = async(queries) => {

}