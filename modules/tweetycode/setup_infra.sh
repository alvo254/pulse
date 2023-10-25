#!/bin/bash

set -e

if [[ $# -eq 0 ]] ; then
    echo 'Please enter your bucket name as ./setup_infra.sh your-bucket'
    exit 0
fi

AWS_ID=$(aws sts get-caller-identity --profile cil-c501 --query Account --output text | cat)
AWS_REGION=$(aws configure get region --profile cil-c501)

echo "Creating local config files"

echo '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:PutLogEvents",
                "logs:CreateLogGroup",
                "logs:CreateLogStream"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::'$1'/*"
        }
    ]
}' > ./policy

echo '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}' > ./trust-policy.json

echo '[
  {
    "Id": "1",
    "Arn": "arn:aws:lambda:'$AWS_REGION':'$AWS_ID':function:tweetPull"
  }
]' > ./targets.json


echo "Packaging local lambda_function.py"
cd lambda
zip -r ../lambdaDeploymentPackage.zip .
cd ..

echo "Creating Lambda layer"
# Create a directory for your Lambda Layer
mkdir python
# Install tweety-ns library
python -m pip install tweety-ns -t python/ > install.log
# Create a deployment package
zip -r python.zip python >> install.log
# Deploy the Lambda Layer
aws lambda publish-layer-version --layer-name tweety-python-layer --zip-file fileb://python.zip --compatible-runtimes python3.10 python3.11 --region us-east-1 --profile cil-c501 --output text > setup.log


echo "Creating bucket "$1""
# aws s3api create-bucket --acl public-read-write --bucket $1 --profile cil-c501 --output text > setup.log
aws s3api create-bucket --bucket $1 --profile cil-c501 --output text >> setup.log

echo "Creating Policy"
aws iam create-policy --policy-name AWSLambdaS3Policy --policy-document file://policy --profile cil-c501 --output text >> setup.log

echo "Creating Role"
aws iam create-role --role-name lambda-data-pull-s3-role --assume-role-policy-document file://trust-policy.json --profile cil-c501 --output text >> setup.log

echo "Attaching Policy to Role"
aws iam attach-role-policy --role-name lambda-data-pull-s3-role --policy-arn arn:aws:iam::$AWS_ID:policy/AWSLambdaS3Policy --profile cil-c501 --output text >> setup.log

echo "Sleeping 10 seconds to allow policy to attach to role"
sleep 10s

echo "Creating Lambda function"
aws lambda create-function --function-name tweetPull --runtime python3.11 --role  arn:aws:iam::$AWS_ID":"role/lambda-data-pull-s3-role --handler lambda_function.lambda_handler --zip-file fileb://lambdaDeploymentPackage.zip  --timeout 60 --profile cil-c501 --output text >> setup.log

echo "Attaching the Lambda Layer to your Lambda function"
aws lambda update-function-configuration --function-name tweetPull --layers arn:aws:lambda:$AWS_REGION:$AWS_ID:layer:tweety-python-layer:2 --profile cil-c501 --output text >> setup.log

echo "Creating cloudwatch rule to schedule lambda every 5 minutes"
aws events put-rule --name tweet-pull-scheduled-rule --schedule-expression 'rate(5 minutes)' --profile cil-c501 --output text >> setup.log

echo "Attaching lambda function to event and then to the rule"
aws lambda add-permission --function-name tweetPull --statement-id tweet-pull-scheduled-event --action 'lambda:InvokeFunction' --principal events.amazonaws.com --source-arn arn:aws:events:$AWS_REGION:$AWS_ID:rule/tweet-pull-scheduled-rule --profile cil-c501 --output text >> setup.log
aws events put-targets --rule tweet-pull-scheduled-rule --targets file://targets.json --profile cil-c501 --output text >> setup.log

echo "Done"