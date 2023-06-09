/**
 * Dev server with CORS disabled for local testing
 */

'use strict';

import 'dotenv/config'
import express from 'express';
import * as url from 'url';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getApiData } from './fetchAPIdata.js';
import { filterReps } from './filterReps.js';
//import testResults from './testResults.json' assert {type: 'json'};

const app = express();
const PORT = 3050;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

// main page
app.use('/', express.static(path.join(__dirname, '../../public')));

// send reps data
app.get('/representatives', async (req, res) => {

    const address = req.query.address;
    const city = req.query.city;
    const state = req.query.state;
    const zip = req.query.zip;

    console.log(`${address} ${city} ${state} ${zip}`);

    const repsData = await getApiData(address, city, state, zip);
    const filteredReps = await filterReps(repsData);

    res.json(filteredReps);
});

app.listen(PORT, () => {
    console.log(`\nFetch reps server - PORT: ${PORT}\n`);
})

// graceful shutdown
const gracefulShutdown = async () => {

    console.log("Shutting down");

    app.close(() => {
        console.log("Express server closed")
        process.exit(0);
    });
}
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
