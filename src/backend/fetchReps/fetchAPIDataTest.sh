#!/bin/bash

# URL encode string
urlencode() {
  python -c "import urllib.parse; print(urllib.parse.quote('$1'))"
}

address="5 Randall Rd"
city="Shoreham"
state="New York"
zip="11786"

encoded_address=$(urlencode "$address")
encoded_city=$(urlencode "$city")
encoded_state=$(urlencode "$state")
encoded_zip=$(urlencode "$zip")

# Construct the URL with encoded query parameters
url="http://localhost:3050/representatives?address=$encoded_address&city=$encoded_city&state=$encoded_state&zip=$encoded_zip"

# Make the cURL DELETE request
curl "$url"
