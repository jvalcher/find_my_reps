import { fetchImgUrls } from "./fetchImgUrls.js";

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

  // get rep articles elements
  const articleElems = document.querySelectorAll("article");

  for (let i = 0; i < articleElems.length; i++) {

    // create rep queries for current level of govt
    const level = articleElems[i].getAttribute("id");   // federal
    let repQueries = await getQueries(level);

    // fetch rep URLs
    try {
      let repImgUrls = await fetchImgUrls(repQueries);
      await setImgSrcs(repImgUrls, level);
    } catch (err) {
      console.error(err);
    }
  }
}

// create queries for scraper from figcaption alt values
const getQueries = async level => {
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

// append rep images to figure at <level> of government
const setImgSrcs = async (srcs, level) => {
  const repLevel = document.querySelector(`article#${level}`);
  const figs = repLevel.querySelectorAll("figure");
  for (let i = 0; i < figs.length; i++) {
    const img = figs[i].querySelector("img");
    img.src = srcs[i];
    figs[i].querySelector(".loader").style.display = "none";
  }
};
