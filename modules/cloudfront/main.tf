# resource "aws_cloudfront_distribution" "pulse-cf" {
#    origin {

#     domain = var.s3_bucket


#     # domain_name              = aws_s3_bucket.b.bucket_regional_domain_name
#     # origin_access_control_id = aws_cloudfront_origin_access_control.default.id
#     # origin_id                = local.s3_origin_id
#   }
# }