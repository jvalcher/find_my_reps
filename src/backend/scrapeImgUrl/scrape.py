from flask import Flask, make_response
from selenium import webdriver
from selenium.webdriver.common.by import By
import atexit

app = Flask(__name__)

@app.route('/imgUrls/<query>', methods=['GET'])
async def fetchImgUrls(query):
    url = await fetch_img_url(f'{query}')
    response = make_response(url)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

async def fetch_img_url(query):
    url = f"https://www.google.com/search?site=&tbm=isch&source=hp&biw=1873&bih=990&q={query}"
    options = webdriver.ChromeOptions()
    sec_ch_ua = '"Examplary Browser"; v="73", ";Not?A.Brand"; v="27"'
    options.add_argument(f'--sec-ch-ua={sec_ch_ua}')
    options.add_argument('--headless')
    options.add_argument("--disable-xss-auditor")
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    img = driver.find_element(By.CLASS_NAME, 'Q4LuWd')
    img_url = img.get_attribute('src')
    driver.quit()
    return img_url