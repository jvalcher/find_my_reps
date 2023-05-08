
export const fetchImgUrls = async (repQueries) => {

    const queryObj = {
        queries: repQueries
    }

    try {
        const data = await fetch('http://localhost:3050/get-images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queryObj)
        });
    } catch(err) {
        console.error(err);
    }

    return data;
}