from flask import Flask, make_response
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

app = Flask(__name__)

@app.route('/imgUrls/<query>', methods=['GET'])
async def fetchImgUrls(query):
    url = await fetch_img(f'{query}')
    response = make_response(url)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# create, start selenium browser instance
browser = list()
async def start_browser():
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--incognito')
    global browser
    browser = webdriver.Chrome(options=options)

# fetch image (base64)
async def fetch_img_helper(query, url):
    try:
        browser.get(url)
        browser.implicitly_wait(5);
        img = browser.find_element(By.CLASS_NAME, 'Q4LuWd')
        img = img.get_attribute('src')
        return img
    except Exception as e:
        print(f'Failed to fetch image: {e}')
        return 'Failed to fetch image'

async def fetch_img(query):

    url = f"https://www.google.com/search?site=&tbm=isch&source=hp&biw=1873&bih=990&q={query}"

    if not browser:
        await start_browser()
    img = await fetch_img_helper(query, url)
    return img
