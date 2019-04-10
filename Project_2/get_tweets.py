from bs4 import BeautifulSoup
import requests

url = 'https://twitter.com/boulderosmp?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'
resp = requests.get(url)
soup = BeautifulSoup(resp.content, "html.parser")

def find_tweets(tweet_count):
    content = []
    for x in range(tweet_count):
        tweet_text = soup.findAll("p", attrs={"class": "tweet-text"})[x]
        tweet_text = tweet_text.get_text()
        tweet_text = str(tweet_text.encode("ascii","ignore"))
        temp_dict = {"text": tweet_text}
        content.append(temp_dict)
    return content