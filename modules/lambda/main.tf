resource "aws_iam_role" "lambda_role" {
  name               = "lambda-data-pull-s3-role"
  # file("${path.module}/staff.sh")
  assume_role_policy = file("${path.module}/trust-policy.json")
}

data "archive_file" "lambda" {
  type        = "zip"
  source_dir = "${path.module}/func/"
  # source_dir  = "../../backend/lambda/"
  # output_path = "lambdaDeploymentPackage.zip"
  output_path = "${path.module}/func/lambda.zip"
}

data "archive_file" "python" {
  type        = "zip"
  source_dir  = "${path.module}/python/"
  output_path = "${path.module}/python/python.zip"
}

resource "aws_iam_policy" "lambda_policy" {
  name   = "AWSLambdaS3Policy"
  policy = file("${path.module}/policy.json")
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  policy_arn = aws_iam_policy.lambda_policy.arn
  role       = aws_iam_role.lambda_role.name
}

resource "aws_lambda_function" "lambda_function" {
  function_name    = "tweetPull"
  role             = aws_iam_role.lambda_role.arn
  handler          = "lambda_function.lambda_handler"
  runtime          = "python3.11"
  filename         = "${path.module}/func/lambda.zip"
  source_code_hash = filebase64sha256(data.archive_file.lambda.output_path)
  timeout          = 60

  vpc_config {
    # vpc_id = var.vpc_id
    subnet_ids = [var.subnet_id]
    security_group_ids = [var.security_group]
  }
}

resource "aws_lambda_layer_version" "tweety_python_layer" {
  filename            = "${path.module}/python/python.zip"
  layer_name          = "tweety-python-layer"
  compatible_runtimes = ["python3.10", "python3.11"]
  
}

//Add policy
resource "aws_s3_bucket" "bucket" {
  bucket = var.bucket_name

}


resource "aws_cloudwatch_event_rule" "event_rule" {
  name                = "tweet-pull-scheduled-rule"
  schedule_expression = "rate(5 minutes)"
}

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "tweet-pull-scheduled-event"
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