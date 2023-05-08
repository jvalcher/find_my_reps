import { fetchImgUrls } from './fetchImgUrls.js';

// create, append representative element
export async function renderReps(data) {

    // render address info
    document.getElementById('my-address').innerText = data.address;
    document.getElementById('my-county').innerText = data.county;
    document.getElementById('my-district').innerText = data.district;

    // render reps under #<level> element
    for (const key of Object.keys(data.reps)) {
        for (const rep of data.reps[key]) {
            
            const title = Object.keys(rep)[0];
            const name = Object.values(rep)[0];

            document.getElementById(key).innerHTML += /*html*/ `
                <figure>
                    <figcaption alt=\"${title} ${name}\">${title} - ${name}</figcaption>
                </figure>
            `;
        }
        
    }

    // add message to empty govt levels
    document.querySelectorAll('article').forEach( level => {
        if (!level.hasChildNodes()) {
            let noReps = document.createElement('p');
            noReps.innerText = 'None available';
            level.appendChild(noReps);
        }
    });

    // get rep articles elements
    const articleElems = document.querySelectorAll('article');

    for (let i = 0; i < articleElems.length; i++) {

        // create rep queries for current level of govt
        let repQueries = [];
        const level = articleElems[i].getAttribute('id');
        console.log(level);
        await getQueries(repQueries, level);

        // fetch rep URLs
        try {
            let repImgUrls = await fetchImgUrls(repQueries);
            console.log('repImgUrls:')
            console.log(repImgUrls[i]);
            await setImgSrcs(repImgUrls, level);
        } catch(err) {
            console.error(err);
        }     
    }
}

// create queries for scraper from figcaption alt values
const getQueries = async (repQueries, level) => {
    const stateReps = document.querySelector(`article#${level}`);
    const figs = stateReps.querySelectorAll('figcaption');
    for (let i = 0; i < figs.length; i++) {
           repQueries.push(figs[i].getAttribute('alt'));
    }
    return repQueries;
}

// append rep images to figure at <level> of government
const setImgSrcs = async (srcs, level) => {
    const stateReps = document.querySelector(`article#${level}`);
    const figs = stateReps.querySelectorAll('figure');
    for (let i = 0; i < figs.length; i++) {
        const img = document.createElement('img');
        img.setAttribute('src', srcs[i]);
        figs[i].appendChild(img);
    }
}