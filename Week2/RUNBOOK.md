# Runbook — CI/CD Pipeline Deployment

## 1. Purpose

This runbook describes how to validate, build and deploy the Python application using GitHub Actions, Docker and AWS EC2.

## 2. Project Details

- **Application:** Python HTTP server
- **Application port:** 5000
- **CI/CD:** GitHub Actions
- **Containerization:** Docker
- **Deployment:** AWS EC2
- **Workflow:** `.github/workflows/ci-cd.yml`

## 3. Prerequisites

- Access to the GitHub repository.
- Python 3.12 and pytest for local testing.
- Docker for local image builds.
- A running EC2 instance with Git and Docker installed.
- SSH connectivity to EC2.
- GitHub Actions secrets configured: `EC2_HOST`, `EC2_USER` and `EC2_SSH_KEY`.

Never commit private keys or other real credentials to the repository.

## 4. Run Tests Locally

From the repository root:

```bash
cd Week2/cicd-project
pip install -r requirements.txt
pytest
```

Confirm that all tests pass before pushing changes.

## 5. Build the Docker Image

From the repository root:

```bash
docker build -t cicd-project:1.0 Week2/cicd-project
```

Inspect the image:

```bash
docker image inspect cicd-project:1.0
```

## 6. Trigger the GitHub Actions Workflow

The workflow runs for pushes to `main` and pull requests targeting `main`.

1. Commit and push the intended changes.
2. Open the repository's Actions tab.
3. Open the latest CI/CD Pipeline run.
4. Verify the `test` job.
5. Verify the `build` job.
6. For a push to `main`, verify the `deploy` job.

The deployment job runs only for a push to `main`, after the build job succeeds.

## 7. Deployment Behavior

The deployment job connects to EC2 using SSH and performs these operations:

1. Changes to `~/intern/REPO-DD8280B8`.
2. Pulls the latest code using `git pull origin main`.
3. Builds the Docker image `cicd-project:1.0`.
4. Removes the existing `cicd-app` container if present.
5. Starts the updated container with a restart policy.
6. Publishes container port 5000 on host port 5000.
7. Displays the running containers.

Note that the current workflow rebuilds the image on EC2. It does not push the image to Docker Hub or Amazon ECR.

## 8. Verify the Deployment on EC2

Connect to EC2 using the configured SSH credentials.

Check the container:

```bash
sudo docker ps
```

Inspect logs:

```bash
sudo docker logs --tail 100 cicd-app
```

Test locally on the instance:

```bash
curl -I http://localhost:5000
```

If the application is reachable, test the configured public endpoint as well. Confirm the EC2 security group allows the required traffic.

## 9. Troubleshooting

### Tests fail

- Read the failed pytest output.
- Check application code and dependencies.
- Reproduce the failure locally before pushing a fix.

### Docker build fails

- Verify the Dockerfile and build context.
- Check the dependency installation output.
- Confirm the required source files exist.

### SSH deployment fails

- Verify the EC2 instance is running.
- Check the GitHub Actions secrets.
- Confirm SSH connectivity, username and key configuration.
- Review the failed workflow step without exposing secret values.

### Docker permission errors

The current workflow uses `sudo docker` on EC2. Verify that Docker is running and that the deployment user has appropriate permissions.

### Application is unreachable

- Check `sudo docker ps`.
- Inspect `sudo docker logs cicd-app`.
- Verify port 5000 mapping.
- Check application binding and EC2 security-group rules.

## 10. Security Notes

- Store SSH credentials in GitHub Actions secrets.
- Restrict SSH access to trusted sources.
- Avoid publishing credentials in logs or screenshots.
- Review vulnerability scan results before claiming an image is secure.

The current GitHub Actions workflow does not include a Trivy scan job. Trivy reports exist in the project directory, but automated scanning should only be claimed after it is configured and verified in the workflow.

## 11. Completion Checklist

- [ ] Local tests pass.
- [ ] Docker image builds successfully.
- [ ] GitHub Actions test job succeeds.
- [ ] GitHub Actions build job succeeds.
- [ ] Deployment job succeeds on pushes to `main`.
- [ ] EC2 container is running.
- [ ] Application responds on port 5000.
- [ ] No credentials are committed to GitHub.

