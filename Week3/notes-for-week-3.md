# Week 3 – CI/CD Pipeline: Testing, Security & Documentation

## 1. Overview

**Project:** CI/CD Pipeline Automation  
**Internship:** DevOps Engineering Self-Learning Internship  
**Organization:** InternCareerPath  
**Week:** 3

### Objective

Complete, test, and document the CI/CD pipeline developed during Week 2. Improve the deployment workflow through application verification, Docker image security scanning, and documentation.

---

## 2. Project Architecture

The CI/CD pipeline automates the following stages:

1. Developer pushes code to GitHub.
2. GitHub Actions triggers the workflow.
3. Automated tests execute using Pytest.
4. Docker image is built.
5. Deployment job connects to the AWS EC2 instance through SSH.
6. Latest application code is pulled from GitHub.
7. Docker image is built on EC2.
8. The application container is deployed.

### Technology Stack

- Git and GitHub
- GitHub Actions
- Python 3.12
- Pytest
- Docker
- AWS EC2
- Linux (Ubuntu)
- Trivy

---

## 3. Day 1 – Application Verification

### Objective

Verify that the CI/CD pipeline successfully deploys the updated application.

### Changes Made

Updated the application success message:

```python
def get_message():
    return "🚀 CI/CD Pipeline Successful — Week 3 Deployment Verified!"
```

The HTML page uses a placeholder that is replaced dynamically:

```python
page = HTML.replace("{{SUCCESS_MESSAGE}}", get_message())
self.wfile.write(page.encode("utf-8"))
```

### Verification

- Updated application code.
- Committed and pushed changes to GitHub.
- GitHub Actions workflow executed successfully.
- Test job passed.
- Build job passed.
- Deploy job passed.
- Verified the deployed application through its browser URL.

**Result:** Successfully verified the CI/CD deployment.

---

## 4. Day 2 – Docker Image Security Scanning

### Objective

Use Trivy to scan Docker images for known vulnerabilities.

### Trivy Installation

Installed Trivy on the AWS EC2 Ubuntu instance.

Check version:

```bash
trivy --version
```

Installed version: `0.75.0`

### Initial Image Scan

```bash
sudo trivy image cicd-project:1.0
```

The initial scan identified Python dependency vulnerabilities.

### Dependency Updates

Updated the Pytest dependency in `requirements.txt`:

```text
pytest==9.0.3
```

Updated the Dockerfile to upgrade pip:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN python -m pip install --no-cache-dir --upgrade pip==26.2.1 \
    && python -m pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/

EXPOSE 5000

CMD ["python3", "app/app.py"]
```

Built the updated image:

```bash
sudo docker build -t cicd-project:1.2 .
```

Verified installed dependencies:

```bash
sudo docker run --rm cicd-project:1.2 python -m pip list
```

---

## 5. Docker Image Testing

Executed the application tests inside a container by mounting the project directory:

```bash
sudo docker run --rm \
  -v "$PWD:/workspace" \
  -w /workspace \
  cicd-project:1.2 \
  python -m pytest
```

**Test Results:**
- Tests collected: 2
- Tests passed: 2
- Tests failed: 0

Note: The production Docker image copies the application directory, not the test directory. The volume mount makes the project tests available inside the temporary test container.

---

## 6. Trivy Vulnerability Investigation

### Scan Command

```bash
sudo trivy image \
  --scanners vuln \
  --format json \
  --output trivy-report.json \
  cicd-project:1.2
```

### Python Vulnerability Findings

The report identified the following Python package records:

| Package | Detected Version | Fixed Version |
|---|---|---|
| msgpack | 1.1.2 | 1.2.1 |
| setuptools | 70.3.0 | 78.1.1 / 83.0.0 |
| urllib3 | 2.7.0 | 2.8.0 |

The report also identified Debian operating-system package vulnerabilities.

### Investigation Performed

- Checked installed Python packages using `pip list`.
- Checked individual packages using `pip show`.
- Inspected Python site-packages directories.
- Examined Trivy's JSON report.
- Identified that the three packages above were marked as SBOM-analyzed records.
- Compared these records with directly detected package metadata.
- Checked Dockerfile instructions and Docker image history.
- Inspected Docker image metadata and filesystem layers.

### Important Observation

The three Python package records were marked as `AnalyzedBy: sbom`, while the corresponding packages were not found through the container's direct package inspection.

Trivy also displayed a warning about third-party SBOM data potentially causing inaccurate vulnerability detection.

**Status:** Investigation is ongoing. These findings have not yet been confirmed as false positives.

---

## 7. Commands Practised

### Docker

```bash
sudo docker images
sudo docker ps
sudo docker history --no-trunc cicd-project:1.2
sudo docker image inspect cicd-project:1.2
sudo docker run --rm cicd-project:1.2 python -m pip list
```

### Pytest

```bash
python3 -m pytest
```

### Trivy

```bash
trivy --version

sudo trivy image cicd-project:1.2

sudo trivy image \
  --scanners vuln \
  --format json \
  --output trivy-report.json \
  cicd-project:1.2
```

---

## 8. Pending Tasks

- Complete the OCI SBOM source investigation.
- Investigate Debian OS package vulnerabilities.
- Review and document Trivy findings.
- Verify Docker container health and deployment status.
- Integrate security scanning into the CI/CD workflow.
- Complete the Week 3 project documentation.
- Commit and push all Week 3 deliverables to GitHub.

---

## 9. Learning Outcomes

Through this project, I practised:

- Automating application testing with GitHub Actions.
- Building and deploying Docker images.
- Deploying applications on AWS EC2.
- Running Pytest inside Docker containers.
- Scanning Docker images with Trivy.
- Understanding Python dependency vulnerabilities.
- Reading and analysing Trivy JSON reports.
- Investigating SBOM-based vulnerability detection.
- Verifying deployments and documenting troubleshooting steps.

---

## 10. Conclusion

Week 3 extended the existing CI/CD project with deployment verification, Docker testing, and vulnerability scanning.

The application deployment and automated tests were successfully verified. Docker image security investigation and final documentation are still in progress.
