const createFetches = async(queries) => {
    let fetches = [];
    for (const i in queries) {
        const f = fetch(`http://localhost:1235/imgUrls/${queries[i]}`, {
                }).then((res) => {
                    return res.text()
                });
        fetches.push(f);
    }
    return fetches
}

export const fetchImgUrls = async(queries) => {
    const response = await createFetches(queries);
    const data = Promise.all(response);
    return data;
}