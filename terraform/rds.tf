variable "db_username" {
  description = "The username for the database."
}

variable "db_password" {
  description = "The password for the database."
}

resource "aws_db_instance" "db_instance" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "16.2"
  instance_class       = "db.t3.micro"
  identifier           = "postgres-db"
  db_name              = "microvan"
  username             = var.db_username
  password             = var.db_password
  skip_final_snapshot  = true
  publicly_accessible  = true
}