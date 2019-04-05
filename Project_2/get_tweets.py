from bs4 import BeautifulSoup
import requests

url = 'https://twitter.com/boulderosmp?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'
resp = requests.get(url)
soup = BeautifulSoup(resp.content, "html.parser")

def find_tweets(tweet_count):
    tweets = []
    for x in range(tweet_count):
        rating = soup.find("p", attrs={"class": "tweet-text"})
        rating = rating.get_text()
        tweets.append(rating)