# Find my representatives

See federal, state, city, and local political representatives for any U.S. address<br>
<br>

**03-25-2025 update:**<br>*Google has discontinued their Representatives API, effective April 30. The live site has been taken down.*<br>
<br>
**07-20-2024 update:**<br>*Firefox issue: Establishing a connection to the server's web socket to send image fetching updates does not work, even though they are being fetched. There are no issues with Chrome.*<br>
<br>
**Note:**<br>*This site doesn't use an image API. It uses Selenium to scrape Base64 images individually from a Google Images query, so they take longer to load.*<br>

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
