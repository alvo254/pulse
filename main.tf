module "s3" {
  source = "./modules/s3"
}

module "vpc" {
  source = "./modules/vpc"
}

module "lambda" {
  source = "./modules/lambda"
  # vpc_id = module.vpc.vpc_id
  subnet_id = module.vpc.public_subnet1
  security_group = module.sg.security_group_id
}

# module "cloudfront" {
#   source = "./modules/cloudfront"
#   s3_bucket = module.s3.aws_s3_bucket
# }

# module "waf" {
#   source = "./modules/waf"
# }

module "sg" {
    source = "./modules/sg"
    vpc_id = module.vpc.vpc_id
}

module "ec2" {
    source = "./modules/ec2"
    vpc_id = module.vpc.vpc_id
    subnet = module.vpc.public_subnet1
    security_group = module.sg.security_group_id
}