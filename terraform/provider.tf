terraform {
  cloud {
    organization = "microvan"

    workspaces {
      name = "microvan"
    }
  }
}

provider "aws" {
  region = "ap-southeast-1"
}