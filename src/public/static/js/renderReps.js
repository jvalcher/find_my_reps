import { fetchImg } from "./fetchImg.js";

// create, append representative element
export async function renderReps(data) {
  // render address info
  document.getElementById("my-address").innerText = data.address;
  if (data.county) document.getElementById("my-county").innerText = data.county;
  if (data.district) document.getElementById("my-district").innerText = data.district;

  // render reps under #<level> element
  for (const key of Object.keys(data.reps)) {
    for (const rep of data.reps[key]) {
      const title = Object.keys(rep)[0];
      const name = Object.values(rep)[0];

      document.getElementById(key).innerHTML += /*html*/ `
                <figure>
                    <div class='rep-img-div'><div class="loader"></div><img class='rep-img' src="/reps/static/images/blue.png"></div>
                    <figcaption class="rep-caption" alt=\"${title} ${name}\">${name}</figcaption>
                    <figcaption class="rep-caption" >${title}</figcaption>
                </figure>
            `;
    }
  }

  // remove title of sections with no reps
  document.querySelectorAll("article").forEach(level => {
    if (!level.hasChildNodes()) {
      level.previousElementSibling.style.display = "none";
    }
  });



  // render reps
  const articleElems = document.querySelectorAll("article");
  for (let i = 0; i < articleElems.length; i++) {

    const level = articleElems[i].getAttribute("id");   // federal
    const queries = await getQueries(level);  // ["rep1", "rep2", ...]
    const figElems = articleElems[i].querySelectorAll("figure");

    for (let i = 0; i < figElems.length; i++) {
      try {
        const repImg = await fetchImg(queries[i]);
        await setImgSrc(repImg, figElems[i]);
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// create queries for scraper from figcaption alt values
const getQueries = async (level) => {
  let repQueries = [];
  const stateReps = document.querySelector(`article#${level}`);
  const figs = stateReps.querySelectorAll("figcaption");
  for (let i = 0; i < figs.length; i++) {
    let query = figs[i].getAttribute("alt");
    if (query) {
      repQueries.push(query);
    }
  }
  return repQueries;
};

// append rep image to figure src
const setImgSrc = async (imgSrc, fig) => {
  const image = fig.querySelector("img");
  image.src = imgSrc;
  fig.querySelector(".loader").style.display = "none";
};
