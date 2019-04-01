from splinter import Browser
from bs4 import BeautifulSoup as bs
import pandas as pd
import requests
import json
import re

results_dict = {}

def master_scrape():
    print("Starting scrape.")
    
    # Get data which stores all data in dictionary above.
    get_featured_image()
    get_articles()
    get_facts()
    get_hemisphere_images()
    get_mars_weather()
    print("Finished scraping!")
    return results_dict
    
def get_articles():
    news = []
    
    news_url = "https://mars.nasa.gov/api/v1/news_items/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest"
    header = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    resp = requests.get(news_url, headers=header)
    resp = resp.json()

    # Get articles
    articles = resp.get('items')
    
    # Iterate over all elements in articles to extract title and body.
    for i in range(len(articles)):
        # Store title.
        title = articles[i]['title'].encode('utf-8')

        # Store body.
        body = articles[i]['body'].encode('utf-8')
        body = re.sub(r'<.*?>', '', body)
        
        news.append({
            "title": title,
            "body": body
        })
        
    results_dict['news'] = news

def get_featured_image():
    # Browser initialized within master_scrape function. 
    image_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"   
    executable_path = {"executable_path": "/Users/jenniferwilson/Desktop/Repositories/UDEN201811DATA3-Homework/Week12/chromedriver"}
    browser = Browser('chrome', **executable_path) 
    browser.visit(image_url)
    html = browser.html
    soup = bs(html, 'html.parser')
    featured_image_url = "https://www.jpl.nasa.gov" + soup.article["style"].split("'")[1].encode('utf-8')
    
    # Store in summary dictionary.
    results_dict['featured_image'] = featured_image_url

def get_mars_weather():
    twitter_url = "https://twitter.com/marswxreport?lang=en"
    header = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    resp = requests.get(twitter_url, headers=header)
    soup = bs(resp.text,'html.parser')

    # Extract first tweet.
    tweet_text = soup.find("p",{"class":"TweetTextSize"}).get_text()

    # Remove ASCII characters.
    tweet_text = str(tweet_text.encode("ascii","ignore"))
    
    # Store in summary dictionary.
    results_dict['weather'] = tweet_text

def get_hemisphere_images():
    
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
    
    get_hemisphere_urls()
    
    images = []
    
    for i in range(len(image_page_urls)):
        url = image_page_urls[i]        
        header = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
        resp = requests.get(url, headers=header)
        soup = bs(resp.text,'html.parser')
        
        image_url = soup.find_all("a", attrs={"target": "_blank"})
        image_url = image_url[0]["href"].encode('utf-8')
        title = soup.find('h2', {"class":"title"}).get_text().encode('utf-8')
        
        images.append({
            "img_url": image_url,
            "title": title
        })
        
    results_dict['hemisphere_images'] = images

def get_facts():
    facts_df = {}
    facts_url = "http://space-facts.com/mars/"
    facts = pd.read_html(facts_url)
    facts_df = facts[0]
    facts_df.rename(columns={0: "Stat", 1:"Values"}, inplace = True) 
    facts_df['Values'] = map(lambda x: x.encode('ascii', 'ignore').decode('ascii'), facts_df["Values"])
    facts_html = facts_df.to_html()
    results_dict['facts'] = facts_html

