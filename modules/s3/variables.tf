variable "project" {
  default = "pulse"
}

variable "environment" {
    type = string
    description = "Environment"
    default = "Dev"
}

variable "bucket_name" {
  default = "pulse-react-bucket"
}