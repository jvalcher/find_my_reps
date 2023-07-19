import Search from './views/Search.js';
import Reps from './views/Reps.js';
import { fetchRepsData } from './fetchRepsData.js';
import { renderReps } from './renderReps.js';


// page router
const router = async (path) => {

    const routes = [
        { path: '/',      view: Search },
        { path: '/reps',  view: Reps}
    ];

    // match pathname with route
    const matches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });
    let match = matches.find((matches) => matches.isMatch);

    // if path not a route, default to home
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


// navigate to page
const navigateTo = async (url) => {
    history.pushState(null, null, url);
    router();
}
// hit back/forward button
window.addEventListener('popstate', (e) => {
    router();
    listenForAddressAndRender();
});


document.addEventListener('DOMContentLoaded', () =>{

    router();

    // nav link functionality
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })

    listenForAddressAndRender();
});

// start address submit listener, render reps page
const listenForAddressAndRender = () => {

    // wait for address form to load
    let addressFormLoadAttempts = 5;
    const addressFormLoaded = setInterval(() => {

        // if on search page, break
        if (document.getElementById('search-header')) {
            clearInterval(addressFormLoadAttempts);
        }
        
        // if form loaded
        if (document.getElementById('search-form')) {
            clearInterval(addressFormLoaded);

            // start address submit listener
            document.getElementById('search-form').addEventListener('submit', async (e) => {

                e.preventDefault();

                // create address data object
                const dataLabels = ["address", "city", "state", "zip"];
                let formData = {};
                for (let i = 0; i < 4; i++) {
                    formData[dataLabels[i]] = document.getElementById(dataLabels[i]).value;
                }

                // get API data
                let repsData;
                try {
                    repsData = await fetchRepsData(
                        formData.address, 
                        formData.city, 
                        formData.state, 
                        formData.zip
                    );
                } catch(err) {
                    console.log(err);
                }

                await navigateTo('/reps');  // navigate to reps page
                await renderReps(repsData);  // render reps info
            });
        }
        if (addressFormLoadAttempts <= 0) clearInterval(addressFormLoadAttempts);
        addressFormLoadAttempts--;
    }, 500)
};
