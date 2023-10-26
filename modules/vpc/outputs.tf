output "project" {
  value = var.project
}

output "environment" {
  value = var.environment
}

output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "public_subnet1" {
  value = aws_subnet.public_subnet1.id
}

output "public_subnet_az1" {
  value = aws_subnet.public_subnet_az1.id
}