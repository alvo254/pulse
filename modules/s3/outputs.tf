output "aws_s3_bucket" {
  value = aws_s3_bucket.pulse_frontend_bucket
}
output "bucket_regional_domain_name" {
  value = aws_s3_bucket.pulse_frontend_bucket.bucket_regional_domain_name
}

output "bucket_id" {
  value = aws_s3_bucket.pulse_frontend_bucket.id
}

output "bucket_arn" {
  value = aws_s3_bucket.pulse_frontend_bucket.arn
}