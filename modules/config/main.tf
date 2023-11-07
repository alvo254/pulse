resource "aws_config_configuration_recorder" "socialjar" {
  name     = "socialjar"
  role_arn = aws_iam_role.role.arn
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["config.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}


resource "aws_iam_role" "role" {
  name               = "awsconfig"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

//Used to collect data from within the aws acount 
resource "aws_config_configuration_aggregator" "socialjar-aggregator" {
  name = "socialjar-aggregator"

  account_aggregation_source {
    //Place change account id to your own when running
    account_ids = ["609806490186"]
    regions     = ["us-east-1"]
  }
}


data "aws_iam_policy_document" "aggregator_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["config.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}
resource "aws_iam_role" "organization" {
  name               = "socialjar-org"
  assume_role_policy = data.aws_iam_policy_document.aggregator_role.json
}

resource "aws_iam_role_policy_attachment" "organization" {
  role       = aws_iam_role.organization.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSConfigRoleForOrganizations"
}

resource "aws_config_delivery_channel" "socialjar" {
  name           = "socialjar-channel"
  s3_bucket_name = aws_s3_bucket.b.id
  depends_on     = [aws_config_configuration_recorder.socialjar]
}


resource "aws_s3_bucket" "b" {
  bucket        = "delivery-channel-b"
  force_destroy = true
}

data "aws_iam_policy_document" "policy" {
  statement {
    effect  = "Allow"
    actions = ["s3:*"]
    resources = [
      aws_s3_bucket.b.arn,
      "${aws_s3_bucket.b.arn}/*"
    ]
  }
}

resource "aws_iam_role_policy" "p" {
  name   = "awsconfig"
  role   = aws_iam_role.role.id
  policy = data.aws_iam_policy_document.policy.json
}


resource "aws_config_configuration_recorder_status" "foo" {
  name       = aws_config_configuration_recorder.socialjar.name
  is_enabled = true
  depends_on = [aws_config_delivery_channel.socialjar]
}

resource "aws_iam_role_policy_attachment" "a" {
  role       = aws_iam_role.role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWS_ConfigRole"
}

resource "aws_config_config_rule" "r" {
  name = "awsconfig-rule-set"

  source {
    owner             = "AWS"
    source_identifier = "S3_BUCKET_VERSIONING_ENABLED"
  }
  

  
  depends_on = [aws_config_configuration_recorder.socialjar]
}

resource "aws_config_conformance_pack" "s3conformancepack" {
  name = "s3conformancepack"
  depends_on = [aws_config_configuration_recorder.socialjar]

  template_body = <<EOT

Resources:
  S3BucketPublicReadProhibited:
    Type: AWS::Config::ConfigRule
    Properties:
      ConfigRuleName: S3BucketPublicReadProhibited
      Description: >- 
        Checks that your Amazon S3 buckets do not allow public read access.
        The rule checks the Block Public Access settings, the bucket policy, and the
        bucket access control list (ACL).
      Scope:
        ComplianceResourceTypes:
        - "AWS::S3::Bucket"
      Source:
        Owner: AWS
        SourceIdentifier: S3_BUCKET_PUBLIC_READ_PROHIBITED
      MaximumExecutionFrequency: Six_Hours
  S3BucketPublicWriteProhibited: 
    Type: "AWS::Config::ConfigRule"
    Properties: 
      ConfigRuleName: S3BucketPublicWriteProhibited
      Description: "Checks that your Amazon S3 buckets do not allow public write access. The rule checks the Block Public Access settings, the bucket policy, and the bucket access control list (ACL)."
      Scope: 
        ComplianceResourceTypes: 
        - "AWS::S3::Bucket"
      Source: 
        Owner: AWS
        SourceIdentifier: S3_BUCKET_PUBLIC_WRITE_PROHIBITED
      MaximumExecutionFrequency: Six_Hours
  S3BucketReplicationEnabled: 
    Type: "AWS::Config::ConfigRule"
    Properties: 
      ConfigRuleName: S3BucketReplicationEnabled
      Description: "Checks whether the Amazon S3 buckets have cross-region replication enabled."
      Scope: 
        ComplianceResourceTypes: 
        - "AWS::S3::Bucket"
      Source: 
        Owner: AWS
        SourceIdentifier: S3_BUCKET_REPLICATION_ENABLED
  S3BucketSSLRequestsOnly: 
    Type: "AWS::Config::ConfigRule"
    Properties: 
      ConfigRuleName: S3BucketSSLRequestsOnly
      Description: "Checks whether S3 buckets have policies that require requests to use Secure Socket Layer (SSL)."
      Scope: 
        ComplianceResourceTypes: 
        - "AWS::S3::Bucket"
      Source: 
        Owner: AWS
        SourceIdentifier: S3_BUCKET_SSL_REQUESTS_ONLY
  ServerSideEncryptionEnabled: 
    Type: "AWS::Config::ConfigRule"
    Properties: 
      ConfigRuleName: ServerSideEncryptionEnabled
      Description: "Checks that your Amazon S3 bucket either has S3 default encryption enabled or that the S3 bucket policy explicitly denies put-object requests without server side encryption."
      Scope: 
        ComplianceResourceTypes: 
        - "AWS::S3::Bucket"
      Source: 
        Owner: AWS
        SourceIdentifier: S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED
  S3BucketLoggingEnabled: 
    Type: "AWS::Config::ConfigRule"
    Properties: 
      ConfigRuleName: S3BucketLoggingEnabled
      Description: "Checks whether logging is enabled for your S3 buckets."
      Scope: 
        ComplianceResourceTypes: 
        - "AWS::S3::Bucket"
      Source: 
        Owner: AWS
        SourceIdentifier: S3_BUCKET_LOGGING_ENABLED
EOT
}



//----------------------------------------------------------------------------------------------------------------

resource "aws_config_conformance_pack" "lambda_conformance_pack" {
  name = "lambda-conformance"  # Set the conformance pack name to "lambda-conformance"
  depends_on = [aws_config_configuration_recorder.socialjar]

  template_body = <<EOT
    # The provided AWS CloudFormation template content goes here
    Parameters:
      LambdaFunctionSettingsCheckParamRuntime:
        Default: nodejs16.x, nodejs14.x, nodejs12.x, python3.9, python3.8, python3.7,
          python3.6, ruby2.7, java11, java8, java8.al2, go1.x, dotnetcore3.1, dotnet6
        Type: String
    Resources:
      LambdaDlqCheck:
        Properties:
          ConfigRuleName: lambda-dlq-check
          Scope:
            ComplianceResourceTypes:
            - AWS::Lambda::Function
          Source:
            Owner: AWS
            SourceIdentifier: LAMBDA_DLQ_CHECK
        Type: AWS::Config::ConfigRule
      LambdaFunctionSettingsCheck:
        Properties:
          ConfigRuleName: lambda-function-settings-check
          InputParameters:
            runtime:
              Fn::If:
              - lambdaFunctionSettingsCheckParamRuntime
              - Ref: LambdaFunctionSettingsCheckParamRuntime
              - Ref: AWS::NoValue
          Scope:
            ComplianceResourceTypes:
            - AWS::Lambda::Function
          Source:
            Owner: AWS
            SourceIdentifier: LAMBDA_FUNCTION_SETTINGS_CHECK
        Type: AWS::Config::ConfigRule
      LambdaInsideVpc:
        Properties:
          ConfigRuleName: lambda-inside-vpc
          Scope:
            ComplianceResourceTypes:
            - AWS::Lambda::Function
          Source:
            Owner: AWS
            SourceIdentifier: LAMBDA_INSIDE_VPC
        Type: AWS::Config::ConfigRule
      LambdaVpcMultiAzCheck:
        Properties:
          ConfigRuleName: lambda-vpc-multi-az-check
          Scope:
            ComplianceResourceTypes:
            - AWS::Lambda::Function
          Source:
            Owner: AWS
            SourceIdentifier: LAMBDA_VPC_MULTI_AZ_CHECK
        Type: AWS::Config::ConfigRule
    Conditions:
      lambdaFunctionSettingsCheckParamRuntime:
        Fn::Not:
        - Fn::Equals:
          - ''
          - Ref: LambdaFunctionSettingsCheckParamRuntime
    EOT
}
