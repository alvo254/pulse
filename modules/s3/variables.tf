variable "project" {
  default = "socialjar"
}

variable "environment" {
    type = string
    description = "Environment"
    default = "Dev"
}

variable "bucket_name" {
  default = "socialjar-react-bucket"
}