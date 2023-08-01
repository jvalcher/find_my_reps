const {Builder, By, Key, until } = require('selenium-webdriver');
const { Styles } = require('./frontStyles.js');

/************
  Functions
 ************/

// set nav anchor href if not on page
const setAnchor = (page, href) => {
  return page === href ? 'style=pointer-events:none' : `href="/${href}"`;
}

// get current year
const getYear = () => {
  const currentDate = new Date();
  return currentDate.getFullYear();
};

// capitalize string
const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};


// fetch rep img with Selenium
/*
let driver = await new Builder().forBrowser('chrome').build();
const fetchRepImg = async (query) => {
  if (!driver)
};
*/


/************
  Components
 ************/

// head
const Head = (title) => {
  return /*html*/`
  
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="/reps/static/images/favicon.png" type="image/x-icon">
  ${Styles()}
</head>

`}

// header
const Header = (page) => { 
  return /*html*/`

<header>
  <h1>Find my representatives</h1>
  <img id="home-img" src="/images/us_flag_ellipse__112x118.png">
</header>

`}

// footer
const Footer = () => {
  return /*html*/`

<footer>Find My Representatives, ${getYear()}</footer>

`}

// reps page address box
const AddressInfo = (data) => {
  return /*html*/`

    <div id="address-info">
        <p id="my-address">${data.address ? data.address : ''}</p>
        <p id="my-county">${data.county ? data.county : ''}</p>
        <p id="my-district">${data.district ? data.district : ''}</p>
    </div>
`};

// create figures
const Figures = (level, data) => {

  let figures = '';
  if (data.reps[level].length > 0) {
    data.reps[level].forEach((item, index) => {
      for (const [key, value] of Object.entries(item)) {
        figures += `

          <figure>
              <div class='rep-img-div'><div class="loader"></div><img class="rep-img" src="/images/blue.png"></div>
              <figcaption class="rep-caption" alt="${key} ${value}">${value}</figcaption>
              <figcaption class="rep-caption" >${key}</figcaption>
          </figure>
        `}
    });
  }
  return figures;
};


// create figures section for <level>
const RepSection = async (level, data) => {
  if (data.reps[level].length > 0) {
    return `

      <h2> ${capitalize(level)} </h2>
      <article id="${level}">
        ${Figures(level, data)}
      </article>

    `;
  } else {
    return ``;
  }
};



/*******
  Pages
 *******/

// home
const Home = () => { 
  return /*html*/`

${Head('Home')}
${Header('home')}
<main>

<section id="search">
    <form id="search-form" method="POST" action="/reps">
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
        <source srcset="/images/us_flag_ellipse__400x420.png" media="(min-width: 1500px)">
        <source srcset="/images/us_flag_ellipse__300x315.png" media="(min-width: 775px)">
        <img src="/images/us_flag_ellipse__508x533.png" alt="U.S. flag logo">
    </picture>
</section>
</main>

`};

const Reps = async (data) => { 
  return /*html*/`

${Head('Reps')}
${Header('reps')}

<main>
  <section id="representatives">

      ${AddressInfo(data)}

      ${await RepSection('federal', data)}
      ${await RepSection('state', data)}
      ${await RepSection('city', data)}
      ${await RepSection('county', data)}

  </section>
</main>

`};


module.exports = {
  Home, 
  Reps 
};

