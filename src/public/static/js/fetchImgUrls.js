import { env } from './env.mjs';

const createFetches = async(queries) => {
    let fetches = [];
    for (const i in queries) {
        const f = fetch(`${env.HOST_SCRAPE}/${queries[i]}`, {
                }).then((res) => {
                    return res.text()
                });
        fetches.push(f);
    }
    return fetches
}

export const fetchImgUrls = async (queries) => {
    const response = await createFetches(queries);
    const data = Promise.all(response);
    return data;
}
