# Import packages.
from splinter import Browser
from bs4 import BeautifulSoup as bs
import pandas as pd
import requests
import json
import pymongo

# The default port used by MongoDB is 27017
# https://docs.mongodb.com/manual/reference/default-mongodb-port/
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# Declare the database
db = client.mars

# Declare the collection
collection = db.mars

# Get NASA Mars News and store results as a list of dictionaries.

def get_articles():
    news = {}
    
    news_url = "https://mars.nasa.gov/api/v1/news_items/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest"
    header = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    resp = requests.get(news_url, headers=header)
    resp = resp.json()

    # Get articls
    articles = resp.get('items')
    
    # Iterate over all elements in articles to extract title and body.
    for i in range(len(articles)):
        # Store title.
        title = articles[i]['title'].encode('utf-8')

        # Store body.
        body = articles[i]['body'].encode('utf-8')
        body = re.sub(r'<.*?>', '', body)
        
        news['article_'+ str(i)] = {
            "title": title,
            "body": body
        }
        
    collection.insert_one(news)

def get_featured_image():
    featured_image = {}
    image_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"    
    executable_path = {'executable_path': '/Users/jenniferwilson/Desktop/Repositories/UDEN201811DATA3-Homework/chromedriver'}
    browser = Browser('chrome', **executable_path)
    browser.visit(image_url)
    html = browser.html
    soup = bs(html, 'html.parser')
    featured_image_url = "https://www.jpl.nasa.gov" + soup.article["style"].split("'")[1].encode('utf-8')
    featured_image['featured_image_url'] = featured_image_url
    collection.insert_one(featured_image)

def get_mars_weather():
    weather = {}
    twitter_url = "https://twitter.com/marswxreport?lang=en"
    header = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    resp = requests.get(twitter_url, headers=header)
    soup = bs(resp.text,'html.parser')

    # Extract first tweet.
    tweet_text = soup.find("p",{"class":"TweetTextSize"}).get_text()

    # Remove ASCII characters.
    tweet_text = str(tweet_text.encode("ascii","ignore"))
    weather['weather'] = tweet_text
    collection.insert_one(weather)

image_page_urls = []

def get_hemisphere_urls():
    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    header = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    resp = requests.get(url, headers=header)
    soup = bs(resp.text,'html.parser')
    hrefs = soup.find_all("a", {"class": "itemLink product-item"})
    
    for i in range(len(hrefs)):
        href_trimmed = hrefs[i]['href'].encode('utf-8')
        image_page_urls.append("https://astrogeology.usgs.gov/" + href_trimmed)

def get_hemisphere_image():
    
    hemisphere_image_urls = {}
    
    for i in range(len(image_page_urls)):
        url = image_page_urls[i]        
        header = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
        resp = requests.get(url, headers=header)
        soup = bs(resp.text,'html.parser')
        
        image_url = soup.find_all("a", attrs={"target": "_blank"})
        image_url = image_url[1]["href"].encode('utf-8')
        title = soup.find('h2', {"class":"title"}).get_text().encode('utf-8')
        
        hemisphere_image_urls['image_'+ str(i)] = {
            "img_url": image_url,
            "title": title
        }
        
    collection.insert_one(hemisphere_image_urls)

def scrape():
    get_articles()
    get_featured_image()
    get_mars_weather()
    get_hemisphere_urls()
    get_hemisphere_image()
    #get_facts()