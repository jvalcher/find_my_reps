@echo off

set ENV_NAME=venv
call %ENV_NAME%/Scripts/activate
set FLASK_APP=scrape.py

waitress-serve --host=localhost --port=1235 scrape:app
