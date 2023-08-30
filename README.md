# Find my representatives

See federal, state, city, and local political representatives for any U.S. address
### [Live demo 🔗](https://jeffvalcher.com/reps)

## Screenshots

<img src='screenshots/ss_home.png' height='250px'>
<img src='screenshots/ss_sock.png' height='250px'>
<img src='screenshots/ss_results.png' height='250px'>

## Frameworks, libraries, et al.

*Note: This site doesn't use an image API. It uses Selenium to scrape Base64 images individually from a Google Images query, so they take longer to load.*

- vanilla JS templating engine
- Express backend
- Node Selenium image scraper
- socket.io for image scraping progress

## Data sources

- Google Civic Information API
- Google Images
