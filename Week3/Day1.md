# Week 3 – Day 1: CI/CD Deployment Verification

## Objective

Verify the existing CI/CD pipeline by updating the application success message, triggering the GitHub Actions workflow, and checking the deployed application on AWS EC2.

## 1. Application Update

Updated the application success message in `app.py`:

```python
def get_message():
    return "🚀 CI/CD Pipeline Successful — Week 3 Deployment Verified!"
```

Updated the HTML response to dynamically display the message:

```python
page = HTML.replace("{{SUCCESS_MESSAGE}}", get_message())
self.wfile.write(page.encode("utf-8"))
```

## 2. GitHub Actions Workflow

Committed and pushed the application changes to the GitHub repository.

The GitHub Actions workflow executed three jobs:

- **Test:** Executed automated Python tests using Pytest.
- **Build:** Built the Docker image.
- **Deploy:** Connected to the AWS EC2 instance through SSH and deployed the application.

## 3. Deployment Verification

Verified the GitHub Actions workflow execution.

| Pipeline Job | Result |
|---|---|
| Test | Passed |
| Build | Passed |
| Deploy | Passed |

Opened the deployed application using the EC2 public IP and application port `5000`.

Verified that the updated success message appeared on the application dashboard.

## 4. Outcome

Successfully verified the end-to-end CI/CD pipeline.

The application was updated, tested, built into a Docker image, and deployed automatically to AWS EC2 through GitHub Actions.

## 5. Key Learnings

- Understood the complete Test → Build → Deploy workflow.
- Practised application updates through Git.
- Verified automated pipeline execution.
- Understood how GitHub Actions connects to an EC2 instance using SSH.
- Verified a live application after automated deployment.

## 6. Status

**Day 1: Completed**
