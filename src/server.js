'use strict';

import 'dotenv/config'
import express from 'express';
import * as url from 'url';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

const app = express();
const PORT = 3050;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(cors());

// live reload  (dev)
if (process.env.ENV == 'dev') {

    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, 'src'));

    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
                liveReloadServer.refresh("/");
            }, 100);
    });

    app.use(connectLivereload());

    // sample reps page for styling
    app.get('/style', (req, res) => {
        try {
            res.send( StylePage() );
        } 
        catch (e) {
            console.log(`Style Page GET error: \n${e}`);
        }
    });
}


// views
import { Home, Reps, StylePage } from './views.js';

// server functions
import { getApiData, filterReps } from './serverUtils.js';



// Home page
app.get('/', (req, res) => {
    try {
        res.send( Home() );
    } 
    catch (e) {
        console.log(`Home GET error: \n${e}`);
    }
});

app.use('/images', express.static( path.join(__dirname, 'images') ))

// reps page
app.post('/reps', async (req, res) => {

    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    
    const repsData = await getApiData(address, city, state, zip);
    const filteredReps = await filterReps(repsData);
    const repsPage = await Reps(filteredReps);

    res.send( repsPage );
});


app.listen(PORT, () => {
    console.log(`\nFetch reps server running on port ${PORT}...\n`);
})
