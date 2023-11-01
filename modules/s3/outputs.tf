/*
output "s3_bucket" {
  value = aws_s3_bucket.socialjar-react-bucket.id
}

output "bucket_regional_domain_name" {
  value = aws_s3_bucket.socialjar-react-bucket.bucket_regional_domain_name
}
*/

output "socialjar_raw_bucket" {
  value = aws_s3_bucket.socialjar-raw-bucket.arn
}

output "socialjar_etl_bucket" {
  value = aws_s3_bucket.socialjar-etl-bucket.arn
}
