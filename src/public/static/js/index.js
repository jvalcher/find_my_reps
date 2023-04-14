import { head } from './head.mjs';
import { header, search, representatives } from './views.mjs';
import { getFormData } from './form.mjs';
import { getRepData } from './fetchServer.mjs';
import { renderReps } from './reps.mjs';

import Search from './views/Search.js';

// page router
const router = async () => {

    const routes = [
        { path: '/', view: Search },
        { path: '/reps', view: () => console.log('Viewing reps page')}
    ];

    // match pathname with route
    const matches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });

    // get current pathname
    let match = matches.find((matches) => matches.isMatch);

    // if path incorrect, default to home
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    // inject HTML
    const view = new match.route.view();
    document.querySelector('#app').innerHTML = await view.getHtml();
};

// custom back/forward history nagivation
window.addEventListener('popstate', router);

// custom nav link functionality
const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
}
document.addEventListener('DOMContentLoaded', () =>{
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
});

/*
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

    document.body.innerHTML += searchPage;
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
*/