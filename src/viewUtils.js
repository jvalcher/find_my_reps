import { Builder, By, promise } from 'selenium-webdriver';
import { Options } from "selenium-webdriver/chrome.js";
import { log as cl } from 'console'



/*
    Render reps section of page
 */

export const renderReps = async (data) => {

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
    const imageArr = await getRepImages(repQueryArray);

    // create rep elements
    repsHtml = await addReps(data, repsHtml, imageArr);

    return repsHtml;
}


/*
    Helper functions
 */


/*
    Selenium Google Image scraper
 */

// Selenium Chrome driver
let driver = undefined;
const startSelenium = async () => {
    const options = new Options();
    options.addArguments('--headless')
    options.addArguments('--no-sandbox')
    options.addArguments('--incognito')
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    return driver;
};



// scrape images from array of queries
const scrapeImages = async (queryArr) => {

    try {

        // start Selenium
        if (!driver) {
            await startSelenium();
        }

        // scrape images in queryArr
        let images = [];
        for (const query of queryArr) {
            const url = `https://www.google.com/search?site=&tbm=isch&source=hp&biw=1873&bih=990&q=${query}`;
            await driver.get(url);
            const img = await driver.findElement(By.className('Q4LuWd'));
            const imgSrc = await img.getAttribute('src');
            (async () => images.push(imgSrc))();
        };

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
const getRepImages = async (repQueryArray) =>
{
    try {
        const images = await scrapeImages(repQueryArray);
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
