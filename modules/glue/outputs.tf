output "tweets_glue_database_arn" {
  value = aws_glue_catalog_database.tweets_glue_database.arn
}

output "tweets_glue_database_name" {
  value = aws_glue_catalog_database.tweets_glue_database.name
}

output "sentiments_catalog_table_name" {
  value = aws_glue_catalog_table.sentiments_catalog_table.name
}

output "entities_catalog_table_name" {
  value = aws_glue_catalog_table.entities_catalog_table.name
}

output "tweets_transformed_table_name" {
  value = aws_glue_catalog_table.tweets_transformed.name
}