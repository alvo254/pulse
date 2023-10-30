import os
import json
import boto3
from tweety import Twitter

s3 = boto3.client("s3")
tweet_bucket = os.environ.get("SOCIALJAR_BUCKET_NAME")
topic = "blockchain"


def lambda_handler(event, context):
    app = Twitter("session")
    app.connect()  # session.tw_session must be present with lambda environment
    all_tweets = app.search(topic, pages=10)

    for tweet in all_tweets:
        tweet = dict(tweet)
        tweet["created_on"] = tweet["created_on"].strftime("%Y-%m-%d %H:%M:%S")
        tweet["author"]["created_at"] = tweet["author"]["created_at"].strftime(
            "%Y-%m-%d %H:%M:%S"
        )
        tweet["date"] = tweet["date"].strftime("%Y-%m-%d %H:%M:%S")
        tweet["author"]["date"] = tweet["author"]["date"].strftime("%Y-%m-%d %H:%M:%S")
        try:
            tweet_json = json.dumps(tweet)
            # Sending data to S3 bucket: key: tweets/blockchain/128282929292929.json
            topic = topic.replace(" ", "-").lower()
            s3.put_object(
                Bucket=f"{tweet_bucket}",
                Key=f'tweets/{topic}/{tweet["id"]}.json',
                Body=tweet_json,
            )
            # Streaming tweet data through kinesis firehose
            firehose.put_record(
                DeliveryStreamName="TweetIngestionFirehoseStream",
                Record={"Data": tweet_json},
            )
        except TypeError as e:
            print(e)
            continue

    return {
        "statusCode": 200,
        "body": json.dumps("Tweets uploaded to S3 successfully."),
    }
