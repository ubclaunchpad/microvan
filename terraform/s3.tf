resource "aws_s3_bucket" "auctionsite_assets" {
  bucket = "microvan-auctionsite-assets"
}

resource "aws_s3_bucket_ownership_controls" "auctionsite_assets" {
  bucket = aws_s3_bucket.auctionsite_assets.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "auctionsite_assets" {
  bucket = aws_s3_bucket.auctionsite_assets.id

  block_public_acls = false
  block_public_policy = false
  ignore_public_acls = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "auctionsite_assets" {
  depends_on = [
    aws_s3_bucket_ownership_controls.auctionsite_assets,
    aws_s3_bucket_public_access_block.auctionsite_assets,
  ]

  bucket = aws_s3_bucket.auctionsite_assets.id
  acl    = "public-read"
}