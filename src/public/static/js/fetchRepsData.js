import { env } from './env.mjs';

 // fetch data from server
export async function fetchRepsData(address, city, state, zip) {

    const DOMAIN = env.FETCH_REPS;
    const QUERY = `?address=${address}&city=${city}&state=${state}&zip=${zip}`;
    const URL = `${DOMAIN}${QUERY}`

    try {
        const res = await fetch(`${URL}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
