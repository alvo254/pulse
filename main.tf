
module "s3" {
  source = "./modules/s3"
}


module "vpc" {
  source = "./modules/vpc"
}

module "lambda" {
  source = "./modules/lambda"
  # vpc_id = module.vpc.vpc_id
  subnet_id      = module.vpc.public_subnet1
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
  source         = "./modules/ec2"
  vpc_id         = module.vpc.vpc_id
  subnet         = module.vpc.public_subnet1
  security_group = module.sg.security_group_id
}

module "glue" {
  source = "./modules/glue"
}

module "kinesis" {
  source                        = "./modules/kinesis"
  socialjar_raw_bucket_arn      = module.s3.socialjar_raw_bucket
  socialjar_etl_bucket_arn      = module.s3.socialjar_etl_bucket
  tweets_lambda_processor_arn   = module.lambda.tweets_lambda_processor_arn
  sentiments_catalog_table_name = module.glue.sentiments_catalog_table_name
  entities_catalog_table_name   = module.glue.entities_catalog_table_name
  tweets_glue_database_name     = module.glue.tweets_glue_database_arn
  tweets_transformed_table_name = module.glue.tweets_transformed_table_name
}