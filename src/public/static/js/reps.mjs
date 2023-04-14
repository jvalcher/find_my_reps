
// create, append representative element
function _createRep(civicData, level, key, title) {

    // append rep under #<level> element
    for (let i in civicData.offices[key].officialIndices) {

        let repIndex = civicData.offices[key].officialIndices[i];
        let repName = civicData.officials[repIndex].name;
        
        document.getElementById(level).innerHTML += /*html*/ `
            <figure>
                <figcaption>${title} - ${repName}</figcaption>
            </figure>
        `;
    }
}

// append representatives to page
export async function renderReps(civicData) {

    for (let key in civicData.divisions) {
        if (key.includes("cd")) {
            document.getElementById('district').innerText = civicData.divisions[key].name;
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

    // create representatives
    for (let key in civicData.offices) {

        // get current title
        let title = civicData.offices[key].name;

        // federal
        if (title.includes("United States") || title.includes('U.S.')) {
            _createRep(civicData, "federal", key, title);
        }

        // state
        else if (title.includes(`${state}`) || title.includes(`${stateAbrev}`)) {
            _createRep(civicData, "state", key, title);
        }

        // county
        else if (title.includes('County')) {
            _createRep(civicData, "county", key, title);
        }
    }
}