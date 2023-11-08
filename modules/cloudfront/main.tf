resource "aws_cloudfront_origin_access_control" "cloudfront" {
  name                              = "cloud-front"
  description                       = "Cloud Front S3 OAC"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
  
}

resource "aws_cloudfront_distribution" "frontend_distribution" {

  origin {
    domain_name              = var.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.cloudfront.id
    origin_id                = "distribution"
  }

  enabled             = true

viewer_certificate {
  cloudfront_default_certificate = true
}
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "distribution"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
 # Define additional cache behaviors for specific path patterns
  # cache_behavior {
  #   path_pattern          = "/images/*"
  #   allowed_methods      = ["GET", "HEAD"]
  #   cached_methods       = ["GET", "HEAD"]
  #   target_origin_id     = "distribution"
  #   min_ttl              = 0
  #   default_ttl          = 3600
  #   max_ttl              = 86400
  #   viewer_protocol_policy = "redirect-to-https"

  #   forwarded_values {
  #     query_string = false
  #     cookies {
  #       forward = "none"
  #     }
  #   }
  # }

  # cache_behavior {
  #   path_pattern          = "/api/*"
  #   allowed_methods      = ["GET", "HEAD", "OPTIONS"]
  #   cached_methods       = ["GET", "HEAD", "OPTIONS"]
  #   target_origin_id     = "distribution"
  #   min_ttl              = 0
  #   default_ttl          = 0
  #   max_ttl              = 0
  #   viewer_protocol_policy = "https-only"

  #   forwarded_values {
  #     query_string = true
  #     cookies {
  #       forward = "none"
  #     }
  #   }
  # }
    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_200"

restrictions {
        geo_restriction {
        restriction_type = "none"
        locations = []
        }
    }
tags = {
    Environment = "production"
    Name = "Frontend App"
  }
}