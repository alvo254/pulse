
resource "aws_cloudwatch_metric_alarm" "billing_alarm" {
  alarm_name          = "BillingAlarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods = 1
  metric_name         = "EstimatedCharges"
  namespace           = "AWS/Billing"
  period             = 21600 # 6 hours
  statistic           = "Maximum"
  threshold           = 10.0 # Set your desired threshold
  alarm_description   = "Billing charges exceeded the threshold"
  alarm_actions       = [aws_sns_topic.billing_alerts.arn]

  dimensions = {
    ServiceName = "AmazonCloudWatch"
  }

  treat_missing_data = "notBreaching"
}

# metric creation for the cloudwatch logs
resource "aws_cloudwatch_log_metric_filter" "cloudwatch_filter" {
  name           = "MyLogFilter"
  log_group_name = "my-services"
  pattern        = "This text should trigger alarm"
  metric_transformation {
    name      = "MyLogMetric"
    namespace = "MyLogNamespace"
    value     = "1"
  }
}




resource "aws_cloudwatch_log_group" "function_log_group" {
  name              = "lambda-logs"
  retention_in_days = 7
  lifecycle {
    prevent_destroy = false
  }
}

//logging policy
resource "aws_iam_policy" "function_logging_policy" {
  name   = "function-logging-policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        Action : [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect : "Allow",
        Resource : "arn:aws:logs:*:*:*"
      }
    ]
  })
}

//Attach the logging policy to the function role
# resource "aws_iam_role_policy_attachment" "function_logging_policy_attachment" {
#   role = aws_iam_role.function_role.id
#   policy_arn = aws_iam_policy.function_logging_policy.arn
# }