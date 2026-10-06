# Week 3 – Day 5: Final CI/CD Pipeline Validation

![Status](https://img.shields.io/badge/Day%205-Completed-brightgreen)
![Pipeline](https://img.shields.io/badge/Pipeline-Test%20%E2%86%92%20Build%20%E2%86%92%20Deploy-blue)
![Docker](https://img.shields.io/badge/Docker-cicd--project%3A1.6-2496ED)

## Table of Contents

1. [Objective](#objective)
2. [Application Change](#1-application-change)
3. [Git Validation](#2-git-validation)
4. [CI/CD Pipeline](#3-cicd-pipeline)
5. [Pipeline Verification](#4-pipeline-verification)
6. [Hardened Docker Image](#5-hardened-docker-image)
7. [Docker Runtime Verification](#6-docker-runtime-verification)
8. [End-to-End Validation](#7-end-to-end-validation)
9. [Security and Reliability Validation](#8-security-and-reliability-validation)
10. [Key Learnings](#9-key-learnings)
11. [Final Outcome](#10-final-outcome)

---

## Objective

Perform a final validation of the CI/CD pipeline after the Docker image security-hardening work completed on Day 4.

The validation focused on confirming that:

- Application changes trigger the CI/CD workflow.
- Automated tests execute successfully.
- The Docker image build succeeds.
- The deployment stage succeeds.
- The application remains accessible after deployment.
- The hardened Docker runtime image continues to work correctly.

---

## 1. Application Change

A small change was made to the application to trigger a fresh CI/CD pipeline run. The success message was updated to:

```text
🚀 CI/CD Pipeline Successful — Week 3 Final Validation!
```

The change was intentionally small so the focus stayed on validating the CI/CD workflow rather than introducing new application functionality.

---

## 2. Git Validation

Check the repository status before committing:

```bash
git status
```

Stage the changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "test: final CI/CD pipeline validation"
```

Push to the `main` branch:

```bash
git push origin main
```

The push triggered the GitHub Actions workflow.

---

## 3. CI/CD Pipeline

A push to `main` triggers a workflow with three primary stages:

```text
Git Push
   ↓
Test
   ↓
Build
   ↓
Deploy
```

### Test Stage

Runs the project's automated tests using **Pytest**.

**Purpose:**
- Validate application functionality.
- Detect regressions.
- Prevent broken code from continuing through the pipeline.

### Build Stage

Builds the Docker image for the application.

**Purpose:**
- Verify that the Dockerfile is valid.
- Ensure the application can be packaged successfully.
- Produce the container image required for deployment.

### Deploy Stage

Runs after the previous stages succeed and deploys the application to the **AWS EC2** environment.

**Deployment process:**
1. Connect to the EC2 server.
2. Update the repository.
3. Build the Docker image.
4. Replace the existing application container.
5. Start the new container.

---

## 4. Pipeline Verification

The GitHub Actions workflow was triggered successfully after pushing the final validation change.

| Stage  | Result    |
|--------|-----------|
| Test   | ✅ Passed |
| Build  | ✅ Passed |
| Deploy | ✅ Passed |

This confirmed that the Docker image security-hardening work did not break the existing CI/CD workflow.

---

## 5. Hardened Docker Image

The Day 4 security-hardening work produced the runtime image:

```text
cicd-project:1.6
```

The final Dockerfile keeps the runtime image minimal:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY app/ ./app/

RUN rm -rf /usr/local/lib/python3.12/site-packages/pip \
           /usr/local/lib/python3.12/site-packages/pip-*.dist-info \
           /usr/local/bin/pip \
           /usr/local/bin/pip3 \
           /usr/local/bin/pip3.12

EXPOSE 5000

CMD ["python3", "app/app.py"]
```

The application uses only Python's standard library:

```python
from http.server import BaseHTTPRequestHandler, HTTPServer
```

Because of this, no external Python packages are required at runtime.

---

## 6. Docker Runtime Verification

Check the final image:

```bash
sudo docker images cicd-project:1.6
```

Start the application using the hardened image:

```bash
sudo docker run --rm \
  -p 5001:5000 \
  cicd-project:1.6
```

From another terminal, test the application:

```bash
curl http://localhost:5001
```

The response was checked to confirm the application runs correctly after image hardening.

---

## 7. End-to-End Validation

The complete workflow validated on Day 5:

```text
Application Change
        ↓
Git Add
        ↓
Git Commit
        ↓
Git Push
        ↓
GitHub Actions
        ↓
Automated Tests
        ↓
Docker Build
        ↓
EC2 Deployment
        ↓
Application Verification
```

This provided an end-to-end verification of the project's CI/CD workflow.

---

## 8. Security and Reliability Validation

The final validation was performed after the Docker runtime image had been hardened. Key improvements from the earlier security investigation:

- Removed unnecessary runtime dependencies.
- Removed `pip` from the runtime image.
- Removed `pip` package metadata.
- Reduced the Docker image size.
- Rebuilt and rescanned the image.
- Verified that the application still runs after hardening.

The security work was therefore validated against the existing CI/CD workflow rather than being treated as an isolated Docker change.

---

## 9. Key Learnings

### CI/CD
- A push to `main` can automatically trigger the complete CI/CD workflow.
- Automated testing provides an early validation point.
- Docker builds can be integrated directly into CI/CD.
- Deployment can be automated after successful validation stages.

### Docker
- Runtime images should contain only the components required to run the application.
- Removing unnecessary packages can reduce image size and attack surface.
- Docker images should be tested after security-related modifications.

### Troubleshooting
- Investigate security scanner findings before making changes.
- Package metadata can cause vulnerability scanners to report components even after their executable/package files have been removed.
- Changes made for security should always be followed by application and pipeline validation.

---

## 10. Final Outcome

Day 5 successfully validated the CI/CD workflow after the Docker image security-hardening work. The final workflow completed:

```text
Test → Build → Deploy
```

The hardened Docker runtime image was also tested to ensure the application continued to function correctly.

### Status

**Day 5: Completed ✅**

### Week 3 Progress

- [x] Day 1 — CI/CD Deployment Verification
- [x] Day 2 — Trivy Security Scanning
- [x] Day 3 — Vulnerability Debugging and Investigation
- [x] Day 4 — Docker Image Security Hardening
- [x] Day 5 — Final CI/CD Pipeline Validation
