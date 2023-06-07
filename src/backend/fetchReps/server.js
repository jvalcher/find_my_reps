/**
 * Dev server with CORS disabled for local testing
 */

'use strict';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import * as url from 'url';
import path from 'path';
import bodyParser from 'body-parser';

import { getApiData } from './fetchAPIdata.js';
import { filterReps } from './filterReps.js';
//import testResults from './testResults.json' assert {type: 'json'};

const app = express();
const PORT = 3050;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json())
app.use('/static', express.static(path.resolve('src/public', 'static')));

// cors for local development
import cors from 'cors';
app.use(cors());

// serve home page
app.get('/', async (req, res) => {
    res.sendFile(path.resolve('src/public', 'index.html'));
});

// send reps data
app.get('/representatives', async (req, res) => {

    const address = req.query.address;
    const city = req.query.city;
    const state = req.query.state;
    const zip = req.query.zip;

    const repsData = await getApiData(address, city, state, zip);
    const filteredReps = await filterReps(repsData);

    res.json(filteredReps);
});

app.listen(PORT, () => {
    console.log(`\nNo-CORS development server -- PORT: ${PORT}\n`);
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
