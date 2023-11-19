# Create an SNS topic for billing alerts
resource "aws_sns_topic" "billing_alerts" {
  name = "BillingAlertsTopic"
}

# # Define an email endpoint for SNS subscriptions
resource "aws_sns_topic_subscription" "email_subscription" {
  topic_arn = aws_sns_topic.billing_alerts.arn
  protocol  = "email"
  endpoint  = "youremail@example.com" # Replace with your email address
}