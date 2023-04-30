import Main from './Main.js';

export default class extends Main {
    constructor() {
        super();
        this.setTitle('My representatives');
    }

    async getHtml() {
        return /*html*/ `
            <header id="reps-header">
                <h1>My representatives</h1>
                <img src="static/images/us_flag_ellipse__112x118.png">
            </header>
            <main>

                <!-- TODO
                <script async src="https://cse.google.com/cse.js?cx=d7754debecb4b4c6d">
                </script>
                <div class="gcse-search"></div>
                -->

                <section id="representatives">
                    <h2>Representatives</h2>
                    <h3 id="district"></h3>
                    <h4>Federal</h4>
                    <article id="federal"></article>
                    <h4>State</h4>
                    <article id="state"></article>
                    <h4>County</h4>
                    <article id="county"></article>
                </section>
            </main>
        `;
    }
}