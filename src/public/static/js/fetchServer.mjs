/**
 * Fetch data from server
 */


export async function getRepData(address, city, state, zip) {

    const URL = 'http://localhost:3050/representatives';
    const QUERY = `?address=${address}&city=${city}&state=${state}&zip=${zip}`;

    try {
        const res = await fetch(`${URL}${QUERY}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}