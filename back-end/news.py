import requests
from datetime import datetime, timedelta, timezone
import os

# Some constant variables
SOURCES = [
    "abc-news", 
    "al-jazeera-english",
    "associated-press",
    "axios",
    "bloomberg",
    "cnn",
    "fox-news",
    "msnbc",
    "national-review",
    "nbc-news",
    "newsweek",
    "politico",
    "reuters",
    "the-hill",
    "the-huffington-post",
    "the-wall-street-journal",
    "the-washington-post",
    "time",
    "usa-today",
    "vice-news"
]

ENDPOINT = "https://newsapi.org/v2/everything"
FETCH_TIMEOUT_SECONDS = 60 * 30

# Simple wrapper class to get and cache news from the News API
class News:

    def __init__(self, sources=SOURCES, limit=12):
        self.sources = sources
        self.limit = limit
        self.articles = None
        self.last_retrieved = datetime.now(timezone.utc)
        self.key = os.environ.get("NEWS_API_KEY")
    
    # Sends GET request to News API, asking for all news articles about Texas 
    # with the given sources and within the past week, returns articles
    def __get_news_api_response(self):
        response = requests.get(ENDPOINT, params={
            "q": "texas",
            "apiKey": self.key,
            "from": datetime.now(timezone.utc) - timedelta(days=7),
            "sources": self.sources,
            "pageSize": self.limit
        })
        if response.ok:
            data = response.json()
            return data["articles"]
        return None
    
    # Gets results cached within the past 30 minutes or the new body from the News API
    def get(self):
        now = datetime.now(timezone.utc)
        delta = now - self.last_retrieved
        if self.articles is None or delta.seconds > FETCH_TIMEOUT_SECONDS:
            articles = self.__get_news_api_response()
            if articles is not None:
                self.articles = articles 
                self.last_retrieved = now
        return self.articles

news = News()

def get_news():
    return { 
        "articles": news.get(), 
        "last_updated": news.last_retrieved.isoformat()
    }