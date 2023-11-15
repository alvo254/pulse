resource "aws_iam_role" "lambda_role" {
  name = "lambda-data-pull-s3-role"
  assume_role_policy = file("${path.module}/trust-policy.json")
}

data "archive_file" "lambda" {
  type       = "zip"
  source_dir = "${path.module}/func/"
  output_path = "${path.module}/func/lambda.zip"
}

data "archive_file" "python" {
  type        = "zip"
  source_dir  = "${path.module}/python/"
  output_path = "${path.module}/python/python.zip"
}

locals {
  layer_zip_path = "${path.module}/python/python.zip"
  requirements_path = "${path.module}/python/requirements.txt"
  # requirements_path = "${path.root}/modules/lambda/python/requirements.txt"
  layer_name = "tweety-python-layer"
}

resource "null_resource" "lambda_layer" {
  triggers = {
    requirements = filesha1(local.requirements_path)
  }
  # the command to install python and dependencies to the machine and zips
  provisioner "local-exec" {
    command = <<EOT
      sudo set -e
      sudo apt-get update -y
      sudo apt install python3 python3-pip zip -y
      sudo rm -rf python
      mkdir python
      pip3 install -r ${local.requirements_path} -t python/
      zip -r ${data.archive_file.python.output_path} python/
    EOT
  }
}

resource "aws_iam_policy" "lambda_policy" {
  name   = "AWSLambdaS3SocialJarPolicy"
  policy = file("${path.module}/policy.json")
}

# Attach the IAM policy to the IAM role associated with the Lambda function
resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  policy_arn = aws_iam_policy.lambda_policy.arn
  role       = aws_iam_role.lambda_role.name
}

resource "aws_lambda_function" "lambda_function" {
  function_name    = "alvotweetSocialJarPull"
  role             = aws_iam_role.lambda_role.arn
  handler          = "lambda_function.lambda_handler"
  runtime          = "python3.11"
  filename         = "${path.module}/func/lambda.zip"
  source_code_hash = filebase64sha256(data.archive_file.lambda.output_path)
  timeout          = 600

  layers = [aws_lambda_layer_version.tweety_python_layer.arn]
  lifecycle {
    create_before_destroy = true
  }

  vpc_config {
    subnet_ids         = [var.subnet_id]
    security_group_ids = [var.security_group]
  }

  environment {
    variables = {
      SOCIALJAR_BUCKET_NAME = var.socialjar_raw_bucket
    }
  }
}

resource "aws_lambda_layer_version" "tweety_python_layer" {
  filename            = local.layer_zip_path
  layer_name          = local.layer_name
  compatible_runtimes = ["python3.10", "python3.11"]

  depends_on = [null_resource.lambda_layer]
}


resource "aws_cloudwatch_event_rule" "event_rule" {
  name                = "tweet-pull-socialjar-scheduled-rule"
  schedule_expression = "rate(60 minutes)"
}

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "tweet-pull-socialjar-scheduled-event"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_function.arn
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.event_rule.arn
}

resource "aws_cloudwatch_event_target" "event_target" {
  rule      = aws_cloudwatch_event_rule.event_rule.name
  target_id = "1"
  arn       = aws_lambda_function.lambda_function.arn
}



data "archive_file" "tweets_process_lambda" {
  type        = "zip"
  source_dir  = "${path.module}/tweet_transform/"
  output_path = "${path.module}/tweet_transform/lambda.zip"
}



resource "aws_iam_role" "tweety_role" {
  name = "lambda-tweety-s3-role"
  assume_role_policy = file("${path.module}/trust-policy.json")
}

resource "aws_iam_role_policy_attachment" "tweety_policy_attachment" {
  policy_arn = aws_iam_policy.lambda_policy.arn
  role       = aws_iam_role.tweety_role.name
}



resource "aws_lambda_function" "tweets_lambda_processor" {
  function_name    = "tweetProcessor"
  role             = aws_iam_role.tweety_role.arn
  handler          = "lambda_function.lambda_handler"
  runtime          = "python3.11"
  filename         = "${path.module}/tweet_transform/lambda.zip"
  source_code_hash = filebase64sha256(data.archive_file.tweets_process_lambda.output_path)
  timeout          = 900
  lifecycle {
    create_before_destroy = true
  }

  vpc_config {
    subnet_ids         = [var.subnet_id]
    security_group_ids = [var.security_group]
  }
  environment {
    variables = {
      ENTITIES_FIREHOSE_STREAM  = var.entities_kinesis_firehose_stream_name
      SENTIMENT_FIREHOSE_STREAM = var.sentiment_kinesis_firehose_stream_name
    }
  }
}

