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
        
        tweet_date = soup.find_all('a',{"class","tweet-timestamp js-permalink js-nav js-tooltip"})
        tweet_date = str(tweet_date[x]['title'].split("- ")[1])
        
        tweet_url = str(soup.findAll("a", attrs={"class": "twitter-timeline-link u-hidden"})[x]['href'])
        
        tweet_text_for_site = tweet_date + " - " + tweet_text[0:100] + "...  "
        temp_dict = {"text": tweet_text_for_site, "url": tweet_url}
        content.append(temp_dict)
    return content