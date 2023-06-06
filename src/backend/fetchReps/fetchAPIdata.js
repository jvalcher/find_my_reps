/*
 * ----------
 * Fetch data from Google Civic Information API
 * ----------
 */

// get API data
export async function getApiData(address, city, state, zip) {

    const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${process.env.API_KEY}&address=${address}%20${city}%20${state}%20${zip}`;

    // fetch data
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}