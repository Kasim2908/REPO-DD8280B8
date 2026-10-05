# Week 3 – Day 4: Docker Image Security Hardening

**Status:** ✅ Completed

## Objective

Investigate and reduce unnecessary security vulnerabilities in the Docker runtime image used by the CI/CD project. The main focus was the Python dependency findings reported by Trivy.

---

## 1. Initial Security Findings

The `cicd-project:1.3` image contained Python vulnerability findings related to:

- `msgpack`
- `setuptools`
- `urllib3`

These packages were investigated to determine why they were being detected.

---

## 2. Application Dependency Investigation

The application imports only:

```python
from http.server import BaseHTTPRequestHandler, HTTPServer
```

This confirmed that the application uses Python's standard library and does not require external Python packages at runtime. The existing runtime image was therefore carrying unnecessary Python packaging tools.

---

## 3. Dockerfile Optimization

The Dockerfile was simplified from installing runtime dependencies to copying only the application:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY app/ ./app/

EXPOSE 5000

CMD ["python3", "app/app.py"]
```

The image was rebuilt as `cicd-project:1.4`.

### Image Size Improvement

| Image               | Size   |
| ------------------- | ------ |
| `cicd-project:1.2`  | 231 MB |
| `cicd-project:1.3`  | 231 MB |
| `cicd-project:1.4`  | 188 MB |

The runtime image was reduced by approximately **43 MB**.

---

## 4. Pip Investigation

Trivy continued reporting a Python vulnerability associated with `pip`. Its presence was verified with:

```bash
python3 -m pip --version
```

Output:

```
pip 25.0.1 from /usr/local/lib/python3.12/site-packages/pip
```

Further investigation found that pip's package metadata remained in the image:

```
/usr/local/lib/python3.12/site-packages/pip-25.0.1.dist-info
```

---

## 5. Runtime Image Hardening

The Dockerfile was updated to remove pip and its associated metadata:

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

The hardened image was built as `cicd-project:1.6`.

---

## 6. Verification

The final image was tested to verify that:

- [x] The application starts successfully.
- [x] The application responds correctly.
- [x] The pip files were removed from the runtime image.
- [x] The temporary test container was successfully cleaned up.
- [x] Trivy was used to reassess the image after the changes.

---

## 7. Security Investigation Results

- The earlier Python findings were associated with packaging components present in the base/runtime image, not dependencies required by the application itself.
- The application does not require `pip` or external Python packages to run.
- Any remaining vulnerabilities must be evaluated separately from the removed Python packaging components, particularly those originating from the Debian base image.

---

## 8. Key Learnings

- Runtime containers should contain only what the application requires.
- Development and testing dependencies do not necessarily belong in production images.
- Trivy findings should be investigated instead of blindly upgrading packages.
- Package metadata can remain in an image even after package files are removed.
- Removing unnecessary components can reduce both image size and attack surface.
- Security scanning should be performed again after image hardening.

---

## 9. Outcome

The CI/CD project's Docker runtime image was optimized and hardened through dependency investigation and removal of unnecessary Python packaging components. The final runtime image was successfully built and tested.

**Day 4 Status:** Completed ✅
