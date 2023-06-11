#!/bin/bash
waitress-serve --threads=4 --host=localhost --port=1235 scrape:app
