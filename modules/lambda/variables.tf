variable "socialjar_raw_bucket" {
  description = "The name of the S3 raw bucket"
  type        = string
}

# variable "vpc_id" {
#   description = "The vpc id"
#   type = string
# }

variable "subnet_id" {
  description = "This is the subnet id"
  type        = string
}

variable "security_group" {
  description = "Security group ID"
  type        = string
}

variable "tweets_analyze_lambda_function_name" {
  default = "tweets_sentiment_analyze"
}

variable "entities_kinesis_firehose_stream_name" {
  description = "The name of the entities fireshose stream"
  type        = string
}

variable "sentiment_kinesis_firehose_stream_name" {
  description = "The name of the sentiment firehose stream"
  type        = string
}