module "s3" {
  source = "./modules/s3"
}

module "vpc" {
  source = "./modules/vpc"
}



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