import puppeteer from 'puppeteer';
import bluebird from 'bluebird';


export const scrapeImgs = async (repQueries) => {

    // open browser
    const withBrowser = async (fn) => {
        const browser = await puppeteer.launch({/* ... */});
        try {
            return await fn(browser);
        } finally {
            await browser.close();
        }
    }
    
    // open page
    const withPage = (browser) => async (fn) => {
        const page = await browser.newPage();
        try {
            return await fn(page);
        } finally {
            await page.close();
        }
    }
    
    // create image search URLs
    let imgSearchUrls = [];
    for (const i in repQueries) {
        const query = repQueries[i];
        const url = `https://duckduckgo.com/?q=${query}&iax=images&ia=images`;
        imgSearchUrls.push(url);
    }

    // scrape first image result's source for each search
    const results = await withBrowser(async (browser) => {
        return bluebird.map(imgSearchUrls, async (url) => {
            return withPage(browser)(async (page) => {
                await page.goto(url);
                await page.waitForSelector("img.tile--img__img");
                return await page.evaluate(() => {
                    const src = document.querySelector("img.tile--img__img").getAttribute("src");
                    return src;
                })
            });
        }, {concurrency: 2});
    });

    return results;
}