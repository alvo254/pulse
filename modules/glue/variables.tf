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


