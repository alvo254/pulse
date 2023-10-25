#!/bin/bash

set -e

if [[ $# -eq 0 ]] ; then
    echo 'Please enter your bucket name as ./setup_infra.sh your-bucket'
    exit 0
fi

AWS_ID=$(aws sts get-caller-identity --query Account --profile cil-c501 --output text | cat)

echo "Removing Cloudwatch schedule rule"
aws events remove-targets --rule tweet-pull-scheduled-rule --ids "1" --profile cil-c501 --output text > tear_down.log
aws events delete-rule --name tweet-pull-scheduled-rule --profile cil-c501 --output text >> tear_down.log
aws lambda delete-function --function-name tweetPull --profile cil-c501 --output text >> tear_down.log
aws lambda delete-layer-version --layer-name tweety-python-layer --version-number 2 --profile cil-c501 --output text >> tear_down.log

echo "Deleting role and policy for lambda - s3 connection"
aws iam detach-role-policy --role-name lambda-data-pull-s3-role --policy-arn arn:aws:iam::$AWS_ID:policy/AWSLambdaS3Policy --profile cil-c501 --output text >> tear_down.log
aws iam delete-role --role-name lambda-data-pull-s3-role --profile cil-c501 --output text >> tear_down.log
aws iam delete-policy --policy-arn arn:aws:iam::$AWS_ID:policy/AWSLambdaS3Policy --profile cil-c501 --output text >> tear_down.log

echo "Deleting bucket "$1""
aws s3 rm s3://$1 --recursive --profile cil-c501 --output text >> tear_down.log
aws s3api delete-bucket --bucket $1 --profile cil-c501 --output text >> tear_down.log

echo "Removing local config files"
rm policy
rm targets.json
rm lambdaDeploymentPackage.zip
rm trust-policy.json
rm setup.log
rm install.log
rm -rf python
rm python.zip
rm tear_down.log