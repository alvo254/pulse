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
  default = "socialjar-react-bucket"
}

variable "socialjar-bucket" {
  description = "This is for raw data collected from twitter"
  default = "socialjar-c501-609806490186"
}

variable "socialjar-bucket-etl" {
  description = "This bucket is for ETL"
  default = "socialjar-c501-609806490186"
}