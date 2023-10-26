module "s3" {
  source = "./modules/s3"
}

module "vpc" {
  source = "./modules/vpc"
}

# module "sg" {
#     source = "./modules/sg"
#     vpc_id = module.vpc.vpc_id
# }

# module "ec2" {
#     source = "./modules/ec2"
#     vpc_id = module.vpc.vpc_id
#     subnet = module.vpc.public_subnet1
#     security_group = module.sg.security_group_id
# }
module "cloudfront" {
  source = "./modules/cloudfront"
  bucket_regional_domain_name =module.s3.bucket_regional_domain_name
  bucket_arn = module.s3.bucket_arn
  bucket_id = module.s3.bucket_id
}
