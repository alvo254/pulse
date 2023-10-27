import json
import boto3
from tweety import Twitter

s3 = boto3.client("s3")
tweet_bucket = "pulse-data-bucket"
topic = "blockchain"

def lambda_handler(event, context):
    app = Twitter("session")
    all_tweets = app.get_tweets(topic)

    for tweet in all_tweets:
        tweet = dict(tweet)
        tweet["created_on"] = tweet["created_on"].strftime(
            "%Y-%m-%d %H:%M:%S"
        )
        tweet["author"]["created_at"] = tweet["author"][
            "created_at"
        ].strftime("%Y-%m-%d %H:%M:%S")
        tweet["date"] = tweet["date"].strftime("%Y-%m-%d %H:%M:%S")
        tweet["author"]["date"] = tweet["author"]["date"].strftime(
            "%Y-%m-%d %H:%M:%S"
        )
        tweet_json = json.dumps(tweet)
        s3.put_object(
            Bucket=f"{tweet_bucket}", Key=f'tweets/{tweet["id"]}.json', Body=tweet_json
        )

    return {
        "statusCode": 200,
        "body": json.dumps("Tweets uploaded to S3 successfully."),
    }

