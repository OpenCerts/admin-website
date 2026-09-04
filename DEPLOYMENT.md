# Deployment

## Deploy to Production

1. Create a PR to merge `develop` → `master`, and merge it.
2. Go to GitHub → **Actions → Build and Deploy to S3 (Production) → Run workflow**.
3. Type `DEPLOY_TO_PRODUCTION` in the confirmation field (required — any other value fails the job immediately).
4. Run it — build and deploy to S3/CloudFront happen automatically.
5. If the deploy is bad, revert the merge commit on `master` and repeat steps 2–4 to redeploy the previous version.

Workflow: [.github/workflows/deploy-s3-prod.yml](.github/workflows/deploy-s3-prod.yml)
Secrets used: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID_PROD` (optional), `GTM_CONTAINER_ID`.

## Deploy to Development

Automatic — just push (or merge a PR) to `develop`. No manual trigger needed.

Workflow: [.github/workflows/deploy-s3-dev.yml](.github/workflows/deploy-s3-dev.yml)
Secrets used: `DEV_AWS_ACCESS_KEY_ID`, `DEV_AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_DEV`, `CLOUDFRONT_DISTRIBUTION_ID_DEV` (optional), `DEV_GTM_CONTAINER_ID`.
