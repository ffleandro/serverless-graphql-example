module "api_gateway" {
  source  = "terraform-aws-modules/apigateway-v2/aws"
  version = "~> 1.0"

  name          = "serverless-graphql-example-api-gateway-http-${var.stage}"
  description   = "Serverless GraphQL Example API Gateway (${var.stage})"
  protocol_type = "HTTP"

  create_api_domain_name = false

  integrations = {
    "POST /" = {
      lambda_arn             = module.lambda_graphql.lambda_function_arn
      payload_format_version = "2.0"
    }
  }
}
