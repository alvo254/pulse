output "s3_bucket" {
  value = aws_s3_bucket.pulse-react-bucket.id
}

output "socialjar_raw_bucket" {
  value = aws_s3_bucket.socialjar-raw-bucket.id
}

output "socialjar_etl_bucket" {
  value = aws_s3_bucket.socialjar-etl-bucket.id
}
output "bucket_regional_domain_name" {
  value = aws_s3_bucket.pulse-react-bucket.bucket_regional_domain_name
}