import tweepy
import os
from dotenv import load_dotenv
from tweepy.auth import OAuthHandler
load_dotenv()

# Authenticate with Twitter API
consumer_key = os.getenv("consumer_key")
consumer_secret = os.getenv("consumer_secret")
access_token = os.getenv("access_token")
access_token_secret = os.getenv("access_token_secret")

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

# Get a user's timeline
user_timeline = api.user_timeline(screen_name='twitter_username', count=100)  # Adjust count as needed
