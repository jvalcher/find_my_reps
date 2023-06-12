# Find my representatives
See federal, state, and local political representatives for any U.S. address

<img src='src/public/static/images/readme1.png' height='250px'>
<img src='src/public/static/images/readme2.png' height='300px'>

## Frameworks, libraries, et al.
A vanilla JavaScript, single-page application with a backend using:
- Express
- Flask
- Selenium

## Data sources
- Google Civic Information API
- Google Images

## Installation and usage
Clone repo
```
git clone git@github.com:jvalcher/civics_data.git
```
Get a free [Google Civic Info API key](https://developers.google.com/civic-information/docs/using_api) and insert it into a `.env` file in the root of the project
```
API_KEY="abcdefg123456789"
```
Create an `env.mjs` file in the root directory for the client-side routes to the servers:
```
export const env = {

    // fetchReps.js -> fetchReps/fetchRepsServer.js
    FETCH_REPS: "https://mysite.com/repsroute",    

    // fetchImgUrls.js  -> scrapeImgUrl/scrape.py
    HOST_SCRAPE: "https://mysite.com/scraperoute", 
}
```
Proxy routes :
- /reps/        -> http://localhost:3050/
- /repsroute    -> http://localhost:3050/representatives
- /scraperoute/ -> http://localhost:1235/imgUrls/
* match last two with `env.mjs` config

Run config
```
npm run config
```
Start servers
```
npm start
```
View site
```
https:mysite.com/reps
```
View server logs
```
npm run logs
```
## Live example
- [jeffvalcher.com/reps](https://jeffvalcher.com/reps)  
- FYI -- Selenium takes a little while to get the images.
