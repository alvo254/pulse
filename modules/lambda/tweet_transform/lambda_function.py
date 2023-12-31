import json
import base64
import boto3
import os

comprehend = boto3.client("comprehend")
translate = boto3.client("translate")
firehose = boto3.client("firehose")
entities_firehose_stream = os.environ.get("ENTITIES_FIREHOSE_STREAM")
sentiment_firehose_stream = os.environ.get("SENTIMENT_FIREHOSE_STREAM")


def translate_text(language, text):
    """Returns text and translates it if not in english"""
    if language != "en":
        response = translate.translate_text(
            Text=text, SourceLanguageCode=language, TargetLanguageCode="en"
        )
        translated_text = response["TranslatedText"]
    else:
        translated_text = text
    return translated_text


def detect_sentiment(client, payload, comprehend_text):
    """Detects sentiments from payload text and returns a sentiment record"""
    sentiment_response = client.detect_sentiment(
        Text=comprehend_text, LanguageCode="en"
    )
    print(sentiment_response)

    sentiment_record = {
        "tweetid": payload.get("id"),
        "author_username": payload.get("author")["username"],
        "text": comprehend_text,
        "original_text": payload.get("text"),
        "sentiment": sentiment_response["Sentiment"],
        "sentiment_positive_score": sentiment_response["SentimentScore"]["Positive"],
        "sentiment_negative_score": sentiment_response["SentimentScore"]["Negative"],
        "sentiment_neutral_score": sentiment_response["SentimentScore"]["Neutral"],
        "sentiment_mixed_score": sentiment_response["SentimentScore"]["Mixed"],
    }
    print(sentiment_record)
    return sentiment_record


def process_entity_response(client, payload, entities_response):
    """Processes an entities response list and streams data through firehose"""
    seen_entities = []
    for entity in entities_response["Entities"]:
        id = entity["Text"] + "-" + entity["Type"]
        if id not in seen_entities:
            entity_record = {
                "tweetid": payload.get("id"),
                "entity": entity["Text"],
                "type": entity["Type"],
                "score": entity["Score"],
            }

            response = client.put_record(
                DeliveryStreamName=entities_firehose_stream,
                Record={"Data": json.dumps(entity_record) + "\n"},
            )
            seen_entities.append(id)


def lambda_handler(event, context):
    for record in event["records"]:
        payload = base64.b64decode(record["data"])
        # Process the payload as needed
        payload = json.loads(payload)
        print(type(payload))  # Example: print the payload to CloudWatch Logs
        # print(f"Decoded payload: {payload}")
        tweet_id = payload.get("id")
        text = payload.get("text")
        language = payload.get("language")
        username = payload.get("author")["username"]
        print(f"tweet_id: {tweet_id}")
        print(f"text: {text}")
        print(f"language: {language}")
        print(f"username: {username}")

        comprehend_text = translate_text(language, text)

        sentiment_record = detect_sentiment(comprehend, payload, comprehend_text)

        response = firehose.put_record(
            DeliveryStreamName=sentiment_firehose_stream,
            Record={"Data": json.dumps(sentiment_record) + "\n"},
        )

        entities_response = comprehend.detect_entities(
            Text=comprehend_text, LanguageCode="en"
        )

        print(entities_response)
        process_entity_response(firehose, payload, entities_response)

    return {"statusCode": 200, "body": json.dumps("Data processed successfully")}
