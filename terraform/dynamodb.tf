module "dynamodb_table" {
  source  = "terraform-aws-modules/dynamodb-table/aws"
  version = "~> 1.0"

  name      = local.dynamodb_users_table_name
  hash_key  = "id"

  attributes = [
    {
      name = "id"
      type = "S"
    }
  ]
}
