resource "aws_glue_catalog_database" "tweets_glue_database" {
  name        = var.database_name
  description = "This is a database for Tweets AWS Glue Catalog"
  tags = {
    Name = "${var.project}-${var.environment}-database"
  }
}

resource "aws_glue_catalog_table" "sentiments_catalog_table" {
  name          = "sentiments"
  database_name = aws_glue_catalog_database.tweets_glue_database.name

  table_type = "EXTERNAL_TABLE"

  parameters = {
    EXTERNAL              = "TRUE"
    "parquet.compression" = "SNAPPY"
    "classification"      = "parquet"
  }

  storage_descriptor {
    location      = "s3://${var.project}-etl-bucket/sentiments/"
    input_format  = "org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat"
    output_format = "org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat"

    ser_de_info {
      name                  = "tweet-sentiments"
      serialization_library = "org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe"

      parameters = {
        "serialization.format" = 1
      }
    }

    columns {
      name = "tweetid"
      type = "string"
    }

    columns {
      name = "author_username"
      type = "string"
    }

    columns {
      name = "original_text"
      type = "string"
    }

    columns {
      name = "sentiment"
      type = "string"
    }

    columns {
      name = "sentiment_positive_score"
      type = "double"
    }

    columns {
      name = "sentiment_negative_score"
      type = "double"
    }

    columns {
      name = "sentiment_neutral_score"
      type = "double"
    }

    columns {
      name = "sentiment_mixed_score"
      type = "double"
    }
  }

  depends_on = [aws_glue_catalog_database.tweets_glue_database]
}

resource "aws_glue_catalog_table" "entities_catalog_table" {
  name          = "entities"
  database_name = aws_glue_catalog_database.tweets_glue_database.name

  table_type = "EXTERNAL_TABLE"

  parameters = {
    EXTERNAL              = "TRUE"
    "parquet.compression" = "SNAPPY"
    "classification"      = "parquet"
  }

  storage_descriptor {
    location      = "s3://${var.project}-etl-bucket/entities/"
    input_format  = "org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat"
    output_format = "org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat"

    ser_de_info {
      name                  = "tweet-entities"
      serialization_library = "org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe"

      parameters = {
        "serialization.format" = 1
      }
    }

    columns {
      name = "tweetid"
      type = "string"
    }

    columns {
      name = "entity"
      type = "string"
    }

    columns {
      name = "type"
      type = "string"
    }

    columns {
      name = "score"
      type = "double"
    }
  }

  depends_on = [aws_glue_catalog_database.tweets_glue_database]
}

resource "aws_glue_catalog_table" "tweets_transformed" {
  name          = "tweets_transformed"
  database_name = aws_glue_catalog_database.tweets_glue_database.name

  table_type = "EXTERNAL_TABLE"

  parameters = {
    EXTERNAL              = "TRUE"
    "parquet.compression" = "SNAPPY"
    "classification"      = "parquet"
  }

  storage_descriptor {
    location      = "s3://${var.project}-etl-bucket/transformed/"
    input_format  = "org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat"
    output_format = "org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat"

    ser_de_info {
      name                  = "tweet_transformed"
      serialization_library = "org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe"

      parameters = {
        "serialization.format" = 1
      }
    }

    columns {
      name = "id"
      type = "string"
    }

    columns {
      name = "created_on"
      type = "string"
    }

    columns {
      name = "date"
      type = "string"
    }

    columns {
      name = "is_retweet"
      type = "boolean"
    }

    columns {
      name = "retweeted_tweet"
      type = "string"
    }

    columns {
      name = "rich_text"
      type = "string"
    }

    columns {
      name = "text"
      type = "string"
    }

    columns {
      name = "tweet_body"
      type = "string"
    }

    columns {
      name = "is_quoted"
      type = "boolean"
    }

    columns {
      name = "quoted_tweet"
      type = "string"
    }

    columns {
      name = "is_reply"
      type = "boolean"
    }

    columns {
      name = "is_sensitive"
      type = "boolean"
    }

    columns {
      name = "reply_counts"
      type = "bigint"
    }

    columns {
      name = "quote_counts"
      type = "bigint"
    }

    columns {
      name = "replied_to"
      type = "string"
    }

    columns {
      name = "vibe"
      type = "string"
    }

    columns {
      name = "views"
      type = "string"
    }

    columns {
      name = "language"
      type = "string"
    }

    columns {
      name = "likes"
      type = "bigint"
    }

    columns {
      name = "place"
      type = "string"
    }

    columns {
      name = "retweet_counts"
      type = "bigint"
    }

    columns {
      name = "source"
      type = "string"
    }

    columns {
      name = "audio_space_id"
      type = "string"
    }

    columns {
      name = "voice_info"
      type = "string"
    }

    columns {
      name = "media"
      type = "array<struct>"
    }

    columns {
      name = "pool"
      type = "string"
    }

    columns {
      name = "user_mentions"
      type = "array<struct>"
    }

    columns {
      name = "urls"
      type = "array<struct>"
    }

    columns {
      name = "hashtags"
      type = "array<string>"
    }

    columns {
      name = "symbols"
      type = "array<string>"
    }

    columns {
      name = "community_note"
      type = "string"
    }

    columns {
      name = "community"
      type = "string"
    }

    columns {
      name = "url"
      type = "string"
    }

    columns {
      name = "threads"
      type = "array<string>"
    }

    columns {
      name = "comments"
      type = "array<string>"
    }
  }

  depends_on = [aws_glue_catalog_database.tweets_glue_database]
}

