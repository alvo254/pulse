
module "s3" {
  source = "./modules/s3"
}

module "vpc" {
  source = "./modules/vpc"
}

module "config" {
  source = "./modules/config"
}

module "lambda" {
  source = "./modules/lambda"
  subnet_id      = module.vpc.public_subnet1
  security_group = module.sg.security_group_id
  socialjar_raw_bucket                   = module.s3.socialjar_raw_bucket
  entities_kinesis_firehose_stream_name  = module.kinesis.entities_kinesis_firehose_stream_name
  sentiment_kinesis_firehose_stream_name = module.kinesis.sentiment_kinesis_firehose_stream_name
}


module "cloudfront" {
  source                      = "./modules/cloudfront"
  s3_bucket                   = module.s3.s3_bucket
  bucket_regional_domain_name = module.s3.bucket_regional_domain_name
}


module "waf" {
  source = "./modules/waf"
}



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
  source                    = "./modules/glue"
  socialjar_raw_bucket_name = module.s3.socialjar_raw_bucket_name
  socialjar_etl_bucket_name = module.s3.socialjar_etl_bucket_name
}


module "kinesis" {
  source                        = "./modules/kinesis"
  socialjar_raw_bucket_arn      = module.s3.socialjar_raw_bucket
  socialjar_etl_bucket_arn      = module.s3.socialjar_etl_bucket
  tweets_lambda_processor_arn   = module.lambda.tweets_lambda_processor_arn
  sentiments_catalog_table_name = module.glue.sentiments_catalog_table_name
  entities_catalog_table_name   = module.glue.entities_catalog_table_name
  tweets_glue_database_name     = module.glue.tweets_glue_database_name
  cloudwatch_log_group_name     = "cloudwatch_log_group_name"
  kinesis_firehose_stream_name  = "stream_name"
}