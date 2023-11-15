terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  profile = "default"
  default_tags {
    tags = {
      Owner = "pulse"
      ManagedBy = "terraform"
    }
  }
}