variable "project" {
  type    = string
  default = "socialjar"
}

variable "environment" {
  type        = string
  description = "Environment"
  default     = "Dev"
}

variable "database_name" {
  type        = string
  description = "The name of the AWS Glue database"
  default     = "tweets_catalog_database"
}

variable "socialjar_raw_bucket_name" {
  description = "The name of the tweets raw S3 bucket"
  type        = string
}

variable "socialjar_etl_bucket_name" {
  description = "The name of the tweets etl S3 bucket"
  type        = string
}


