const renderReps = async (data) => {


  // remove title of sections with no reps
  document.querySelectorAll("article").forEach(level => {
    if (!level.hasChildNodes()) {
      level.previousElementSibling.style.display = "none";
    }
  });

  // fetch, insert rep images
  const articleElems = document.querySelectorAll("article");

  for (let i = 0; i < articleElems.length; i++) {

    const level = articleElems[i].getAttribute("id");   // federal
    const queries = await getQueries(level);            // ["rep1", "rep2", ...]
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

// create image scraper queries from figcaption alt values
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

// add rep image src to figure
const setImgSrc = async (imgSrc, fig) => {
  const image = fig.querySelector("img");
  image.src = imgSrc;
  fig.querySelector(".loader").style.display = "none";
};
modules.export = {
  getRepsData
};
