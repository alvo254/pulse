resource "aws_acm_certificate" "cert" {
  domain_name       = "pulse-hub.com"
  validation_method = "DNS"

  tags = {
    Environment = "dev"
  }

#   lifecycle {
#     create_before_destroy = true
#   }
}