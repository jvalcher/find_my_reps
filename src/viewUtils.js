import { Builder, By, promise } from 'selenium-webdriver';
import { Options } from "selenium-webdriver/chrome.js";
import { log as cl } from 'console'



/*
    Render reps section of page
 */

export const renderReps = async (data, ratio) => {

    let repsHtml = "";

    // create rep query array
    let repQueryArray = [];
    try {
        for (const level of Object.keys(data.reps))     // level
        {
            for (const rep of data.reps[level])
            {
                const title = Object.keys(rep)[0];      // title
                const name = Object.values(rep)[0];     // name
                repQueryArray.push(`${title} ${name}`);
            }
        }
    } catch (e) {
        console.log(`Unable to create rep queries: \n${e}`);
    }

    // fetch images
    const imageArr = await getRepImages(repQueryArray, ratio);

    // create rep elements
    repsHtml = await addReps(data, repsHtml, imageArr);

    return repsHtml;
}



/*
    Image scraper
    -----------------------------
    Scrapes first Google Images search result for 
    each query in queryArr; returns array of Base64
    image strings

    - queryArr  -> representative search strings
    - ratio     -> { fetched: "_", total: "_",  string: "_ / _"};
        ** See "POST /reps" route socket in server.js
*/
const scrapeImages = async (queryArr, ratio) => {

    let images = [];
    ratio.fetched = 1;
    ratio.total = queryArr.length.toString();
    ratio.string = `${ratio.fetched.toString()} / ${ratio.total}`;

    try {

        // start Selenium driver instance
        const options = new Options();
        options.addArguments('--headless')
        options.addArguments('--no-sandbox')
        options.addArguments('--incognito')
        const driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        
        // scrape each query in queryArr
        for await (const query of queryArr) {

            const url = `https://www.google.com/search?site=&tbm=isch&source=hp&biw=1873&bih=990&q=${query}`;

            // scrape image
            await driver.get(url);
            const img = await driver.findElement(By.className('Q4LuWd'));
            const imgSrc = await img.getAttribute('src');
            (async () => images.push(imgSrc))();

            // update "<fetched> / <total>" ratio for socket
            ratio.fetched += 1;
            ratio.string = `${ratio.fetched.toString()} / ${ratio.total}`;
        };

        await driver.quit();
        return images;
    } 
    catch (e) {
        console.log(`Unable to fetch images: \n${e}`);
    }
};



/*
    Render reps page
 */

// fetch rep images
const getRepImages = async (repQueryArray, ratio) =>
{
    try {
        const images = await scrapeImages(repQueryArray, ratio);
        return images;
    } catch (e) {
        console.error(`Unable to fetch rep images: \n${e}`);
    }
}

// create rep elements
const addReps = async (repData, repsHtml, repImagesArr) =>
{
    // add rep elements to page
    let imgIndex = 0;
    try {
        for (const level of Object.keys(repData.reps))     // level
        {
            let repsBlock = `
                <h2>${level.toUpperCase()}</h2>
                <article id="${level}">
            `;

            // add rep figures
            for (const rep of repData.reps[level])
            {
                const title = Object.keys(rep)[0];      // title
                const name = Object.values(rep)[0];     // name

                repsBlock += `

                    <figure>
                        <div class='rep-img-div'>
                            <img class="rep-img" src="${repImagesArr[imgIndex]}">
                        </div>
                        <figcaption class="rep-caption" alt="${title} ${name}">${name}</figcaption>
                        <figcaption class="rep-caption" >${title}</figcaption>
                    </figure>
                `;
                imgIndex += 1;
            }
            repsBlock += "</article>";

            // add to page
            repsHtml += repsBlock;
        }
    } catch (e) {
        console.log(`Unable to add rep elements to page: \n${e}`);
    }

    return repsHtml;
};
