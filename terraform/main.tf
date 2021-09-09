variable "stage" {
  type = string
  default = "dev"
}

locals {
  mapbox_api_key = "THIS_NEEDS_TO_BE_CHANGED"
  dynamodb_users_table_name = "serverless-graphql-example-user-dynamodb-${var.stage}"
  package_name = "serverless-graphql-example-api.zip"
}

provider "aws" {
  region = "us-east-1"

  # Make it faster by skipping these
  skip_get_ec2_platforms      = true
  skip_metadata_api_check     = true
  skip_region_validation      = true
  skip_credentials_validation = true

  # skip_requesting_account_id should be disabled to generate valid ARN in apigatewayv2_api_execution_arn
  skip_requesting_account_id = false
}
