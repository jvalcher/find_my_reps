// create, append representative element
async function _createRep(civicData, level, key, title) {

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

    // render congressional district
    for (let key in civicData.divisions) {
        if (/cd:..$/.test(key)) {
            const congr_dist = civicData.divisions[key].name;
            document.getElementById('district').innerText = congr_dist;
            break;
        }
    }

    // get state name and abbreviation
    let state;
    for (let key in civicData.divisions) {
        if (/state:..$/.test(key)) {
            state = civicData.divisions[key].name;
            break;
        }
    }
    const stateAbrev = civicData.normalizedInput.state;

    // create representatives
    repLoop:
    for (let key in civicData.offices) {

        // get current title
        let title = civicData.offices[key].name;

        // federal
        if (title.includes("United States") || title.includes('U.S.')) {
            _createRep(civicData, "federal", key, title);
        }

        // state
        else if (title.includes(`${state}`) || title.includes(`${stateAbrev}`)) {

            // filter reps
            const repIgnoreFilters = [
                'Accounts',
                'Railroad',
                'Land',
                'Agriculture',
                'Court',
            ]
            for (let filter of repIgnoreFilters) {
                if (title.includes(filter)) {
                    continue repLoop
                }
            }

            _createRep(civicData, "state", key, title);
        }

        // county
        else if (title.includes('County')) {

            // filter reps
            const repIgnoreFilters = [
                'Clerk',
                'Tax',
                'Treasurer',
                'District Clerk'
            ]
            for (let filter of repIgnoreFilters) {
                if (title.includes(filter)) {
                    continue repLoop
                }
            }

            _createRep(civicData, "county", key, title);
        }
    }
}