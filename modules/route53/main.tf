# resource "aws_route53_zone" "pulse" {
#   name = "pulse-hub.com"
# }


# nameservers


# resource "aws_route53_record" "dev-ns" {
#   zone_id = aws_route53_zone.pulse.zone_id
#   name    = "pulse-hub.com"
#   type    = "NS"
#   ttl     = "30"
#   records = aws_route53_zone.dev.name_servers
# }