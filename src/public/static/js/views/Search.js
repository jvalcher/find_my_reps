import Main from './Main.js';

export default class extends Main {
    constructor() {
        super();
        this.setTitle('Search');
    }

    async getHtml() {
        return /*html*/ `
            <main>
                <section id="search">
                    <form id="search-form">
                        <label for="address">Address</label>
                        <input type="text" id="address" name="address" class="form-input">
                        <label for="city">City</label>
                        <input type="text" id="city" name="city" class="form-input">
                        <label for="state">State</label>
                        <input type="text" id="state" name="state" class="form-input">
                        <label for="zip">ZIP Code</label>
                        <input type="number" id="zip" name="zip" class="form-input">
                        <input id="submit" type="submit" value="Search">
                    </form>
                    <picture>
                        <source srcset="static/images/us_flag_ellipse__400x420.png" media="(min-width: 1500px)">
                        <source srcset="static/images/us_flag_ellipse__300x315.png" media="(min-width: 775px)">
                        <img src="static/images/us_flag_ellipse__508x533.png" alt="U.S. flag logo">
                    </picture>
                </section>
            </main>
        `;
    }
}