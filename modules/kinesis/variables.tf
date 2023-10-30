variable "socialjar_raw_bucket_arn" {
  description = "The ARN of the tweets raw S3 bucket"
  type        = string
}

variable "socialjar_etl_bucket_arn" {
  description = "The ARN of the tweets etl S3 bucket"
  type        = string
}

variable "tweets_lambda_processor_arn" {
  description = "The ARN of the tweets process lambda"
  type        = string
}

variable "sentiments_catalog_table_name" {
  description = "The name of the AWS glue sentiments table"
  type        = string
}

variable "entities_catalog_table_name" {
  description = "The name of the AWS glue entities table"
  type        = string
}

variable "tweets_glue_database_name" {
  description = "The name of AWS glue database"
  type        = string
}

variable "tweets_transformed_table_name" {
  description = "The name of the AWS glue tweets transformed table"
  type        = string
}