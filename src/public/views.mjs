
// header
export const header = /*html*/ `
    <header>
        <h1>Find my representatives</h1>
        <img src="images/us_flag_ellipse__112x118.png">
    </header>
`;

// address search
export const search = /*html*/ `
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
                <source srcset="images/us_flag_ellipse__400x420.png" media="(min-width: 1500px)">
                <source srcset="images/us_flag_ellipse__300x315.png" media="(min-width: 775px)">
                <img src="images/us_flag_ellipse__508x533.png" alt="U.S. flag logo">
            </picture>
        </section>
    </main>
`;

// representatives
export const representatives = /*html*/ `
    <main>

        <script async src="https://cse.google.com/cse.js?cx=d7754debecb4b4c6d">
        </script>
        <div class="gcse-search"></div>

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