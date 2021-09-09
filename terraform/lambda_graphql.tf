module "lambda_graphql" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "~> 2.0"

  function_name = "serverless-graphql-example-lambda-${var.stage}"
  description   = "Serverless GraphQL Example Lambda Function (${var.stage})"
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  publish       = true
  hash_extra    = "graphql"

  create_package = false
  local_existing_package = "../dist/${local.package_name}"
  
  attach_tracing_policy    = true
  attach_policy_statements = true

  policy_statements = {
    dynamodb = {
      effect    = "Allow",
      actions   = [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Scan",
        "dynamodb:Query",
      ],
      resources = [module.dynamodb_table.dynamodb_table_arn]
    }
  }

  allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service    = "apigateway"
      source_arn = "${module.api_gateway.apigatewayv2_api_execution_arn}/*/*/*"
    }
  }

  environment_variables = {
    USERS_TABLE = local.dynamodb_users_table_name
    MAPBOX_KEY  = local.mapbox_api_key
  }
}
