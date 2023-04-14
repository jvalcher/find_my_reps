'use strict';

import * as dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import { getApiData } from './fetchAPI.mjs';

const app = express();
const PORT = 3050;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// return representative API data
app.get('/representatives', async (req, res) => {

    const address = req.query.address;
    const city = req.query.city;
    const state = req.query.state;
    const zip = req.query.zip;

    const repsData = await getApiData(address, city, state, zip);

    console.log(`DATA: ${repsData}`);

    res.json(repsData);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})