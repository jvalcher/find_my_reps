require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = process.env.PORT;
const logtimezone = 'gmt-5';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// utilities
const {
  timestamp,
  getRepsData,
  filterReps
} = require('./serverUtils.js');

// views
const {
  Home,
  Reps
} = require('./frontViews.js');


/********
  routes
 ********/

app.use('/images', express.static(path.join(__dirname, 'images')))

app.get('/', async (req, res) => {
  try {
    timestamp.logfile(req);
    res.send(Home());
  } 
  catch (err) {
    timestamp.logfile(req, err);
    res.status(500).send('Internal server error');
  }
});

app.post('/reps', async (req, res) => {

  try {
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;

    const repsData = await getRepsData(address, city, state, zip);
    const filteredReps = await filterReps(repsData);

    await timestamp.logfile(req)
    await res.status(200).send(await Reps(filteredReps));
  } 

  catch (err) {
    timestamp.logfile(req, err);
    res.status(500).send('Internal server error');
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}\n`);
});

