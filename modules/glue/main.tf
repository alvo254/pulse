resource "aws_glue_catalog_database" "tweets_catalog_database" {
  name = var.database_name
  description = "This is a database for Tweets AWS Glue Catalog"
  tags = {
    Name = "${var.project}-${var.environment}-database"
  }
}