'use strict';

import 'dotenv/config'
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import * as url from 'url';
import path from 'path';
import bodyParser from 'body-parser';


const app = express();
const PORT = 3050;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));


// views
import { Home, Reps, StylePage } from './views.js';

// server functions
import { cl, getApiData, filterReps } from './serverUtils.js';

// rep image ratio socket
io.on('connection', (socket) => {});


// images
app.use('/images', express.static( path.join(__dirname, 'images') ))


// Home page
app.get('/', (req, res) => {
    try {
        res.send( Home() );
    } 
    catch (e) {
        console.log(`Home GET error: \n${e}`);
    }
});


// reps page
app.post('/reps', async (req, res) => {

    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;

    // update rep image fetch ratio on page every half second
    const repInterval = setInterval(() => {
        io.emit('ratioUpdated', global.repImgRatio);
    }, 500);
    
    const repsData = await getApiData(address, city, state, zip);
    const filteredReps = await filterReps(repsData);
    const repsPage = await Reps(filteredReps);

    clearInterval(repInterval);

    res.send( repsPage );
});


// rep style page (dev)
app.get('/rep-style', (req, res) => {
    try {
        res.send( StylePage() );
    } 
    catch (e) {
        console.log(`Home GET error: \n${e}`);
    }
});


server.listen(PORT, () => {
    console.log(`\nFetch reps server running on port http://127.0.0.1:${PORT}`);
})


