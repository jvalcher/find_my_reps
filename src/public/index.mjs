import { head } from './head.mjs';
import { header, search, representatives } from './views.mjs';
import { getFormData } from './form.mjs';
import { getRepData } from './fetchServer.mjs';
import { renderReps } from './reps.mjs';

// render head
document.head.innerHTML += head;

// search page layout
const searchPage =  `
    ${header}
    ${search}
`;

// render reps page on refresh
if (sessionStorage.getItem('currPage') === 'reps') {

    document.body.innerHTML = sessionStorage.getItem('pageState');
} 

// render search page
else {

    document.body.innerHTML = searchPage;
    sessionStorage.setItem('pageState', document.body.innerHTML);
    sessionStorage.setItem('currPage', 'search');

    // search address, render reps page
    document.getElementById('search-form').addEventListener('submit', async (e) => {

        e.preventDefault();

        // get form data
        const formData = getFormData();

        // get API data
        const apiData = await getRepData(formData.address, formData.city, formData.state, formData.zip)

        // render representatives page skeleton
        document.body.innerHTML = `
            ${header}
            ${representatives}
        `;

        // insert reps
        renderReps(apiData)

            // save page state
            .then( () => {
                sessionStorage.setItem('pageState', document.body.innerHTML);
                sessionStorage.setItem('currPage', 'reps');
                history.pushState('')
            })
    });
}
