# Week 3 – Day 2: Docker Image Security Scanning with Trivy

## Objective

Install Trivy, scan the Docker image for vulnerabilities, review dependency findings, and investigate the security report.

## 1. Install Trivy

Installed Trivy on the EC2 Ubuntu instance.

Verified the installation:

```bash
trivy --version
```

Installed version: `0.75.0`

## 2. Scan the Docker Image

Scanned the Docker image:

```bash
sudo trivy image cicd-project:1.0
```

The scan identified vulnerabilities in the image, including Python dependency findings and Debian operating-system package findings.

## 3. Update Python Dependencies

Updated the project dependencies:

- pytest: `9.0.3`
- pip: `26.2.1`

Updated the Dockerfile to install the pinned pip version:

```dockerfile
RUN python -m pip install --no-cache-dir --upgrade pip==26.2.1 \
    && python -m pip install --no-cache-dir -r requirements.txt
```

Built the updated image:

```bash
sudo docker build -t cicd-project:1.2 .
```

## 4. Run Tests

Ran the project tests inside a container with the project directory mounted:

```bash
sudo docker run --rm \
  -v "$PWD:/workspace" \
  -w /workspace \
  cicd-project:1.2 \
  python -m pytest
```

**Result:** 2 tests passed.

## 5. Investigate Trivy Findings

Generated a JSON vulnerability report:

```bash
sudo trivy image \
  --scanners vuln \
  --format json \
  --output trivy-report.json \
  cicd-project:1.2
```

The report showed Python package findings for:

- msgpack `1.1.2`
- setuptools `70.3.0`
- urllib3 `2.7.0`

These entries were marked as SBOM-analyzed rather than detected from direct package metadata.

The packages did not appear in the container's `pip list` output or package-directory search. Trivy also displayed a warning about third-party SBOM data.

**Investigation status:** Unresolved. The source and accuracy of these SBOM entries still need to be investigated.

The report also contained Debian 13.6 operating-system package findings. These need to be reviewed separately.

## 6. Key Learnings

- Trivy can scan Docker images for known vulnerabilities.
- Vulnerability reports can include both OS packages and language-specific dependencies.
- SBOM-based findings should be checked against the actual image contents.
- A successful application test does not automatically mean the image is vulnerability-free.
- Security findings should be investigated before changing dependencies or rebuilding production images.

## Outcome

- Trivy installed successfully.
- Docker image `cicd-project:1.2` built.
- Both application tests passed.
- Python SBOM findings and Debian OS findings identified.
- SBOM investigation remains in progress.

**Status:** Day 2 – Completed with pending security investigation.
