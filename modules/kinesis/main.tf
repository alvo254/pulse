data "aws_region" "current" {}

data "aws_partition" "current" {}

data "aws_caller_identity" "current" {}

# Create an IAM role for the Firehose delivery
resource "aws_iam_role" "firehose_role" {
  name = "TweetIngestionAnalysisTransformFirehoseRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "firehose.amazonaws.com"
        }
      },
    ]
  })
}

# Create an IAM policy for the Firehose delivery stream
resource "aws_iam_policy" "firehose_policy" {
  name        = "TweetIngestionAnalysisTransformFirehosePolicy"
  description = "Policy for the Kinesis Firehose delivery stream"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:AbortMultipartUpload", "s3:GetBucketLocation", "s3:GetObject", "s3:ListBucket", "s3:ListBucketMultipartUploads", "s3:PutObject"]
        Resource = [var.socialjar_raw_bucket_arn, "${var.socialjar_raw_bucket_arn}/*", var.socialjar_etl_bucket_arn, "${var.socialjar_etl_bucket_arn}/*"]
      },
      {
        Effect   = "Allow"
        Action   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents", "logs:DescribeLogStreams"]
        Resource = ["arn:${data.aws_partition.current.partition}:logs:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:log-group:/aws/kinesisfirehose/*"]
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "glue:GetTable",
          "glue:GetTableVersion",
          "glue:GetTableVersions"
        ],
        "Resource" : [
          "arn:aws:glue:us-east-1:609806490186:catalog",
          "arn:aws:glue:us-east-1:609806490186:database/*",
          "arn:aws:glue:us-east-1:609806490186:table/*/*"
        ]
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "kafka:GetBootstrapBrokers",
          "kafka:DescribeCluster",
          "kafka:DescribeClusterV2",
          "kafka-cluster:Connect"
        ],
        "Resource" : "arn:aws:kafka:us-east-1:609806490186:cluster/%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%/%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "kafka-cluster:DescribeTopic",
          "kafka-cluster:DescribeTopicDynamicConfiguration",
          "kafka-cluster:ReadData"
        ],
        "Resource" : "arn:aws:kafka:us-east-1:609806490186:topic/%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%/%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%/%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "kafka-cluster:DescribeGroup"
        ],
        "Resource" : "arn:aws:kafka:us-east-1:609806490186:group/%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%/%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%/*"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "lambda:InvokeFunction",
          "lambda:GetFunctionConfiguration"
        ],
        "Resource" : "arn:aws:lambda:us-east-1:609806490186:function:%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "kms:GenerateDataKey",
          "kms:Decrypt"
        ],
        "Resource" : [
          "arn:aws:kms:us-east-1:609806490186:key/%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%"
        ],
        "Condition" : {
          "StringEquals" : {
            "kms:ViaService" : "s3.us-east-1.amazonaws.com"
          },
          "StringLike" : {
            "kms:EncryptionContext:aws:s3:arn" : [
              "arn:aws:s3:::%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%/*",
              "arn:aws:s3:::%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%"
            ]
          }
        }
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "logs:PutLogEvents"
        ],
        "Resource" : [
          "arn:aws:logs:us-east-1:609806490186:log-group:/aws/kinesisfirehose/SENTIMENT_STREAM:log-stream:*",
          "arn:aws:logs:us-east-1:609806490186:log-group:%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%:log-stream:*"
        ]
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "kinesis:DescribeStream",
          "kinesis:GetShardIterator",
          "kinesis:GetRecords",
          "kinesis:ListShards"
        ],
        "Resource" : "arn:aws:kinesis:us-east-1:609806490186:stream/%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "kms:Decrypt"
        ],
        "Resource" : [
          "arn:aws:kms:us-east-1:609806490186:key/%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%"
        ],
        "Condition" : {
          "StringEquals" : {
            "kms:ViaService" : "kinesis.us-east-1.amazonaws.com"
          },
          "StringLike" : {
            "kms:EncryptionContext:aws:kinesis:arn" : "arn:aws:kinesis:us-east-1:609806490186:stream/%FIREHOSE_POLICY_TEMPLATE_PLACEHOLDER%"
          }
        }
      },
    ]
  })
}

resource "aws_iam_policy_attachment" "firehose_policy_attach" {
  name = "firehose_policy_attachment"

  roles      = [aws_iam_role.firehose_role.name]
  policy_arn = aws_iam_policy.firehose_policy.arn
}

# Create a Kinesis Firehose delivery stream for ingestin
resource "aws_kinesis_firehose_delivery_stream" "ingestion_firehose_stream" {
  name        = "TweetIngestionFirehoseStream"
  destination = "extended_s3"

  extended_s3_configuration {
    bucket_arn = var.socialjar_raw_bucket_arn
    role_arn   = aws_iam_role.firehose_role.arn

    prefix              = "raw/backup/"
    error_output_prefix = "errors/"

    buffering_size = 128

    cloudwatch_logging_options {
      enabled        = false
      log_group_name = aws_cloudwatch_log_group.kinesis_firehose_stream_logging_group.name
    }

    /*processing_configuration {
      enabled = "true"

      processors {
        type = "Lambda"

        parameters {
          parameter_name  = "TweetsProcessorLambdaArn"
          parameter_value = "${var.tweets_lambda_processor_arn}:$LATEST"
        }
      }
    }*/

    /*
    data_format_conversion_configuration {
      input_format_configuration {
        deserializer {
          hive_json_ser_de {}
        }
      }

      output_format_configuration {
        serializer {
          parquet_ser_de {}
        }
      }

      
      schema_configuration {
        database_name = var.tweets_glue_database_name
        role_arn      = aws_iam_role.firehose_role.arn
        table_name    = var.tweets_transformed_table_name
      }
    }*/
  }
}

# Create a Kinesis Firehose delivery stream for entities
resource "aws_kinesis_firehose_delivery_stream" "entities_firehose_stream" {
  name        = "TweetEntitiesFirehoseStream"
  destination = "extended_s3"

  extended_s3_configuration {
    bucket_arn = var.socialjar_etl_bucket_arn
    role_arn   = aws_iam_role.firehose_role.arn

    prefix              = "entities/"
    error_output_prefix = "errors/"

    buffering_size = 128

    //Remeber to enable loggin
    cloudwatch_logging_options {
      enabled        = false
      log_group_name = aws_cloudwatch_log_group.kinesis_firehose_stream_logging_group.name
    }

    data_format_conversion_configuration {
      input_format_configuration {
        deserializer {
          open_x_json_ser_de {}
        }
      }

      output_format_configuration {
        serializer {
          parquet_ser_de {}
        }
      }

      schema_configuration {
        database_name = var.tweets_glue_database_name
        role_arn      = aws_iam_role.firehose_role.arn
        table_name    = var.entities_catalog_table_name
        region        = data.aws_region.current.name
      }
    }
  }
}

# Create a Kinesis Firehose delivery stream for sentiment
resource "aws_kinesis_firehose_delivery_stream" "sentiment_firehose_stream" {
  name        = "TweetSentimentFirehoseStream"
  destination = "extended_s3"

  extended_s3_configuration {
    bucket_arn = var.socialjar_etl_bucket_arn
    role_arn   = aws_iam_role.firehose_role.arn

    prefix              = "sentiments/"
    error_output_prefix = "errors/"

    buffering_size = 128
    // enable cloud logging
    cloudwatch_logging_options {
      enabled        = false
      log_group_name = aws_cloudwatch_log_group.kinesis_firehose_stream_logging_group.name
    }

    data_format_conversion_configuration {
      input_format_configuration {
        deserializer {
          open_x_json_ser_de {}
        }
      }

      output_format_configuration {
        serializer {
          parquet_ser_de {}
        }
      }

      schema_configuration {
        database_name = var.tweets_glue_database_name
        role_arn      = aws_iam_role.firehose_role.arn
        table_name    = var.sentiments_catalog_table_name
        region        = data.aws_region.current.name
      }
    }
  }
}

resource "aws_cloudwatch_log_group" "kinesis_firehose_stream_logging_group" {
  name = "/aws/kinesisfirehose/${var.kinesis_firehose_stream_name}"
}