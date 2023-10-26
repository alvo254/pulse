variable "AWS_REGION" {
  default = "us-east-1"
}

variable "BUCKET_NAME" {
  description = "The name of the S3 bucket"
  type        = string
}
