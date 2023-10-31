variable "project" {
  description = "This is the project name"
  default = "pulse"
}

variable "environment" {
    type = string
    description = "Environment"
    default = "Dev"
}

variable "bucket_name" {
  description = "This is the react bucket for frontend"
  default = "pulse-react-bucket"
}

variable "skilljar-bucket" {
  description = "This is for raw data collected from twitter"
  default = "pulse-skilljar"
}

variable "skilljar-bucket-etl" {
  description = "This bucket is for ETL"
  default = "pulse-skilljar"
}