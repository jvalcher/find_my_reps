import Main from './Main.js';

export default class extends Main {
    constructor() {
        super();
        this.setTitle('My representatives');
    }

    async getHtml() {
        return `
            <header id="reps-header">
                <a href="/reps" data-link><h1>My representatives</h1></a>
                <img src="/reps/static/images/us_flag_ellipse__112x118.png">
            </header>
            <main>
              <div id="note">
                <p><i><u><b>Note:</b></u></i></p> 
                <p><i>This site doesn't use an image API. It uses Selenium to scrape Base64 images individually from a <b>Google Images</b> query, so they take longer to load.</i></p>
              </div>
              <section id="representatives">

                  <div id="address-info">
                      <p id="my-address"></p>
                      <p id="my-county"></p>
                      <p id="my-district"></p>
                  </div>

                  <h2>Federal</h2>
                  <article id="federal"></article>
                  <h2>State</h2>
                  <article id="state"></article>
                  <h2>City</h2>
                  <article id="city"></article>
                  <h2>County</h2>
                  <article id="county"></article>

              </section>
            </main>
        `;
    }
}
