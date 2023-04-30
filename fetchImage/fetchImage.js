async function getFirstImage(query) {
    const response = await fetch(`https://www.google.com/search?q=${query}&tbm=isch`, {
        method: 'GET'
    });
    const html = await response.text();
    const htmlDoc = await parseHtml(html);
    await renderImage(htmlDoc);
}

async function parseHtml(html) {
    const sanitizedHtml = DOMPurify.sanitize(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedHtml, 'text/html');
    return doc;
}

async function renderImage(doc) {
    const imageDiv = doc.querySelectorAll('div');
    let firstImageDiv;
    for (let i = 0; i < imageDiv.length; i++) {
        let currDiv = imageDiv[i];
        if (currDiv.hasAttribute('jsname')) {
            firstImageDiv = currDiv;
        }
    }
    console.log(firstImageDiv)
    //const firstImage = firstImageDiv.querySelector('img');
    //document.getElementById('img').src = firstImage.src;
}

window.addEventListener('load', (e) => {
    getFirstImage('dog');
})
