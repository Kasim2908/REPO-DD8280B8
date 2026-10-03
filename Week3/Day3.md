# Week 3 – Day 3: Trivy Vulnerability Scan Debugging and Investigation

## Objective

Investigate the Python dependency vulnerability findings reported by Trivy during the security scan of the Docker image `cicd-project:1.2`.

The objective was to understand whether the reported packages were installed independently, bundled inside pip, or incorrectly identified through SBOM metadata.

## 1. Initial Trivy Findings

During the scan of `cicd-project:1.2`, Trivy reported Python package vulnerabilities involving:

| Package | Detected Version | Reported Fixed Version | Severity |
|---|---:|---:|---|
| msgpack | 1.1.2 | 1.2.1 | High |
| setuptools | 70.3.0 | 78.1.1 / 83.0.0 | High / Medium |
| urllib3 | 2.7.0 | 2.8.0 | High / Medium |

Trivy also reported vulnerabilities in the Debian 13.6 operating-system packages.

The findings were investigated before attempting any remediation.

## 2. Debugging: SBOM Investigation

The Trivy JSON report showed that the Python package findings were analyzed using SBOM information:

- `AnalyzedBy`: `sbom`
- Package file paths were not provided for these findings.
- The findings were therefore investigated against the actual container contents.

A local Docker image scan was performed using:

```bash
sudo trivy image \
  --image-src docker \
  --scanners vuln \
  --format json \
  --output trivy-local-scan.json \
  cicd-project:1.2
```

The scan completed and generated a JSON report.

## 3. Debugging: Python Package Verification

The container was inspected to determine whether the reported packages existed inside the Python environment.

Command used:

```bash
sudo docker run --rm cicd-project:1.2 sh -c '
find /usr/local/lib/python3.12/site-packages \
  \( -iname "*msgpack*" -o -iname "*setuptools*" -o -iname "*urllib3*" \) \
  -print
'
```

The investigation identified:

- `pip/_vendor/urllib3`
- `pip/_vendor/msgpack`

The Python package metadata check showed that `msgpack`, `setuptools`, and `urllib3` were not installed as independent distributions.

However, this did not mean that all their code was absent from the image.

## 4. Verification of Vendored Dependencies

The following command was used to inspect pip's vendored dependency information:

```bash
sudo docker run --rm cicd-project:1.2 sh -c '
grep -E "^(msgpack|urllib3|setuptools)==" \
/usr/local/lib/python3.12/site-packages/pip/_vendor/vendor.txt || true
'
```

Output:

```text
msgpack==1.1.2
setuptools==70.3.0
```

The following Python check verified the versions of the modules bundled inside pip:

```python
from pip._vendor import urllib3, msgpack

print("Vendored urllib3:", urllib3.__version__)
print("Vendored msgpack:", msgpack.__version__)
```

Output:

```text
Vendored urllib3: 2.7.0
Vendored msgpack: 1.1.2
```

### Investigation results

- **msgpack:** Confirmed as a vendored module inside pip.
- **urllib3:** Confirmed as a vendored module inside pip.
- **setuptools:** Listed in pip's `vendor.txt`, but no matching directory was found inside `pip/_vendor`.

The setuptools investigation is not yet complete. Its presence elsewhere in the container still needs to be checked.

## 5. Errors and Troubleshooting

### Issue 1: Docker image SBOM source

An attempt to scan using OCI SBOM sources encountered a Docker Hub authentication error because the local image name was interpreted as a remote image reference.

**Troubleshooting:** Used the local Docker image source with `--image-src docker` to perform the scan locally.

### Issue 2: Pytest collected zero tests inside the image

Running pytest directly inside the container resulted in zero collected tests because the Dockerfile copied the application directory but did not copy the `tests/` directory.

**Troubleshooting:** Mounted the project directory into the container:

```bash
sudo docker run --rm \
  -v "$PWD:/workspace" \
  -w /workspace \
  cicd-project:1.2 \
  python -m pytest
```

**Result:** 2 tests passed.

### Issue 3: Python vulnerability findings remained after upgrading pip

The Docker image was rebuilt with pip `26.2.1` and pytest `9.0.3`. However, Trivy continued to report vulnerabilities associated with vendored Python modules.

**Troubleshooting:** Inspected the actual pip vendored modules and compared their versions with Trivy's reported package versions.

## 6. Key Learnings

- A package can be bundled inside another Python package without being installed as an independent distribution.
- Pip includes vendored dependencies that can still be detected by vulnerability scanners.
- SBOM-based findings should be investigated against the actual image contents.
- A successful Docker build does not automatically mean that the image is vulnerability-free.
- Dockerfiles should deliberately include the files needed for the intended container tests.
- Security scan findings should be investigated and documented before claiming remediation.

## 7. Current Status

| Investigation | Status |
|---|---|
| Local Trivy scan | Completed |
| msgpack vendoring verification | Verified |
| urllib3 vendoring verification | Verified |
| setuptools investigation inside pip vendor directory | No matching directory found |
| setuptools search across the complete Python environment | Pending |
| Vulnerability remediation | Not yet completed |
| Pytest verification | 2 tests passed |

## 8. Conclusion

Day 3 focused on debugging and investigating the Python vulnerability findings reported by Trivy.

The investigation confirmed that `msgpack 1.1.2` and `urllib3 2.7.0` are bundled inside pip. The `setuptools 70.3.0` entry was found in pip's vendored dependency list, but no matching directory was found inside pip's vendor directory.

The remaining setuptools investigation and vulnerability remediation are pending. No vulnerability has been marked as fixed without verification.

**Day 3 Status: Investigation in Progress**
