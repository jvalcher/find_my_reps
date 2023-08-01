'use strict';

import 'dotenv/config'
import express from 'express';
import * as url from 'url';
import path from 'path';
import bodyParser from 'body-parser';
import { getApiData } from './fetchAPIdata.js';
import { filterReps } from './filterReps.js';

const app = express();
const PORT = 3050;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(bodyParser.json())

// main page
app.use('/', express.static(path.join(__dirname, '../../public')));
app.use('/reps', express.static(path.join(__dirname, '../../public')));

// send reps data
app.get('/representatives', async (req, res) => {

    const address = req.query.address;
    const city = req.query.city;
    const state = req.query.state;
    const zip = req.query.zip;

    console.log(`${address} ${city} ${state} ${zip}`);

    const repsData = await getApiData(address, city, state, zip);
    const filteredReps = await filterReps(repsData);

    console.log(filteredReps);

    res.json(filteredReps);
});

app.listen(PORT, () => {
    console.log(`\nFetch reps server running on port ${PORT}...\n`);
})
