
let url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${env.API_KEY}&address=Floresville%20TX%2078114`;


/*
// fetch civic data
async function getData() {
    try {
        const res = await fetch(url)
            const obj = await res.json();
            return obj;
    } catch (error) {
        console.error(error);
    }
}
async function renderData() {
    const data = await getData();
    console.log(data);
}
renderData();
*/

// TEMPORARY: get JSON data from "data.json"
import civicData from './data.json' assert { type: 'json' };
console.log(civicData);


/*
    Representatives
*/

// display congressional district
for (var key in civicData.divisions) {
    if (key.includes("cd")) {
        document.getElementById('district').innerText = civicData.divisions[key].name;
    }
}

// create representative figure and caption
function createRep(level, key, title) {

    // create figure for every official with title
    for (let i in civicData.offices[key].officialIndices) {

        let repIndex = civicData.offices[key].officialIndices[i];
        let repName = civicData.officials[repIndex].name;
        
        // render figure and caption
        const parentSection = document.getElementById(level);
        let repContainer = document.createElement('figure');
        let repTitle = document.createElement('figcaption');
        repTitle.innerText = `${title} - ${repName}`;
        repContainer.appendChild(repTitle);
        parentSection.appendChild(repContainer)
    }
}

// get state name and abbreviation
let stateAbrev = civicData.normalizedInput.state;
let state;
for (var key in civicData.divisions) {
    if (key.includes("state") && !key.includes(`${stateAbrev}+"/"`)) {
        state = civicData.divisions[key].name;
    }
}

// get representatives
for (let key in civicData.offices) {

    let title = civicData.offices[key].name;

    // federal
    if (title.includes("United States") || title.includes('U.S.')) {
        createRep("federal", key, title);
    }

    // state reps
    else if (title.includes(`${state}`) || title.includes(`${stateAbrev}`)) {
        createRep("state", key, title);
    }

    // county reps
    else if (title.includes('County')) {
        createRep("county", key, title);
    }

}


/*
    Voting
*/