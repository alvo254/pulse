variable "project" {
  description = "This is the project name"
  default = "socialjar"
}

variable "environment" {
    type = string
    description = "Environment"
    default = "Dev"
}

variable "bucket_name" {
  description = "This is the react bucket for frontend"
  default = "socialjar-reacts-bucket"
}

variable "socialjar-bucket-raw" {
  description = "This is for raw data collected from twitter"
  default = "pulse-raw-bucket"
}

variable "socialjar-bucket-etl" {
  description = "This bucket is for ETL"
  default = "socialjar-etl-bucket"
}