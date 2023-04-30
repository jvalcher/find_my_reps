/**
 * Dev server with CORS disabled for local testing
 */

'use strict';

import * as dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import * as url from 'url';
import path from 'path';
import { getApiData } from './fetchAPI.js';
import cors from 'cors';

const app = express();
const PORT = 3050;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// serve app
//app.use(express.static('src/public'))
app.use('/static', express.static(path.resolve('src/public', 'static')));

// fetch home page
/*
app.get('/*', (req, res) => {
    res.sendFile(path.resolve('src/public', 'index.html'));
});
*/

app.get('/', async (req, res) => {
    res.sendFile(path.resolve('src/public', 'index.html'));
});

// fetch reps from api
app.get('/representatives', async (req, res) => {

    const address = req.query.address;
    const city = req.query.city;
    const state = req.query.state;
    const zip = req.query.zip;

    const repsData = await getApiData(address, city, state, zip);

    res.json(repsData);
});

app.listen(PORT, () => {
    console.log(`\nNo-CORS development server -- PORT: ${PORT}\n`);
})