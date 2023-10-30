output "aws_s3_bucket" {
  value = aws_s3_bucket.socialjar-react-bucket
}

output "socialjar_raw_bucket" {
  value = aws_s3_bucket.socialjar-raw-bucket
}

output "socialjar_etl_bucket" {
  value = aws_s3_bucket.socialjar-etl-bucket
}
output "bucket_regional_domain_name" {
  value = aws_s3_bucket.socialjar-react-bucket.bucket_regional_domain_name
}