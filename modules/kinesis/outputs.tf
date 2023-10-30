output "ingestion_kinesis_firehose_stream_arn" {
  value = aws_kinesis_firehose_delivery_stream.ingestion_firehose_stream.arn
}

output "entities_kinesis_firehose_stream_arn" {
  value = aws_kinesis_firehose_delivery_stream.entities_firehose_stream.arn
}

output "sentiment_kinesis_firehose_stream_arn" {
  value = aws_kinesis_firehose_delivery_stream.sentiment_firehose_stream.arn
}

output "ingestion_kinesis_firehose_stream_name" {
  value = aws_kinesis_firehose_delivery_stream.ingestion_firehose_stream.name
}

output "entities_kinesis_firehose_stream_name" {
  value = aws_kinesis_firehose_delivery_stream.entities_firehose_stream.name
}

output "sentiment_kinesis_firehose_stream_name" {
  value = aws_kinesis_firehose_delivery_stream.sentiment_firehose_stream.name
}