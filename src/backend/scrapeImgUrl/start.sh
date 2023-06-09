#!/bin/bash
waitress-serve --threads=6 --host=localhost --port=1235 scrape:app
