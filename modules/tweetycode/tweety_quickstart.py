"""
The sample code below is quickstarter to get tweets for a selected topic
Later we should plan to see how to use this with a lambda function and storing
the data to s3 for the start.
"""
from tweety import Twitter
import json

# creating an app instance for the current session
app = Twitter("session")

# getting tweets for any provided topic
# topic should be an existing username on twitter
# For example topics `elonmusk`, `crypto` are existing usernames on twitter
topic = "provide any topic name here"
all_tweets = app.get_tweets(topic)

last_tweet = None  # Using last tweet just to investigate how tweet data is structured

# Looping through the returned tweets
# Tweets are returned as Tweet object e.g Tweet(id=1448580179979345920, author=User(id=928759224599040001, username=crypto, name=Bloomberg Crypto, verified=True), created_on=2021-10-14 09:23:22+00:00)
# We have to do some investigations to see which data to access from the tweet.
for tweet in all_tweets:
    print(tweet)
    last_tweet = tweet

# Uncomment the next print line below if you want to see which attributes
# are available on the tweet object
# print(dir(last_tweet))

print("=" * 100)
print(dict(last_tweet))


print("=" * 100)
last_tweet = dict(last_tweet)
last_tweet["created_on"] = last_tweet["created_on"].strftime("%Y-%m-%d %H:%M:%S")
last_tweet["author"]["created_at"] = last_tweet["author"]["created_at"].strftime("%Y-%m-%d %H:%M:%S")
last_tweet["date"] = last_tweet["date"].strftime("%Y-%m-%d %H:%M:%S")
last_tweet["author"]["date"] = last_tweet["author"]["date"].strftime("%Y-%m-%d %H:%M:%S")
print(last_tweet)

# Saving the lastweet object to a json file just to investigate
# how really the data looks like
with open(f"{topic}_tweet.json", "w") as outfile: 
    json.dump(last_tweet, outfile)

print("=" * 100)
json_object = json.dumps(last_tweet, indent = 2)  
print(json_object)

