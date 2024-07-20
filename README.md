# Find my representatives

See federal, state, city, and local political representatives for any U.S. address<br>
<br>
**Note:**<br>*This site doesn't use an image API. It uses Selenium to scrape Base64 images individually from a Google Images query, so they take longer to load.*<br>
<br>
**07-20-2024 update:**<br>*For some reason `socket.io` has stopped working in Firefox. Chrome still shows the image fetch updates.*<br>


### [Live demo 🔗](https://jeffvalcher.com/reps)

## Screenshots

<img src='screenshots/ss_home.png' height='250px'>
<img src='screenshots/ss_sock.png' height='250px'>
<img src='screenshots/ss_results.png' height='250px'>

## Frameworks, libraries

- Express backend
- vanilla JS templating engine
- Node Selenium image scraper
- socket.io for displaying progress when fetching images

## Data sources

- Google Civic Information API
- Google Images
