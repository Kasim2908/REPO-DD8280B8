# InternCareerPath — DevOps Engineering Internship

## Internship Overview

This repository contains my work for the **six-week DevOps Engineering Self-Learning Internship Program** offered by **InternCareerPath**.

The purpose of this internship is to develop practical DevOps skills through project-based learning, automation, documentation, and real-world deployment practices.

## Repository Information

| Detail | Information |
|---|---|
| Organization | InternCareerPath |
| Internship Type | Self-Learning Internship |
| Domain | DevOps Engineering |
| Duration | 6 Weeks |
| Mode | Project-Based Learning |
| Repository Name | `REPO-DD8280B8` |
| GitHub Username | `Kasim2908` |

---

## Table of Contents

- [Internship Overview](#internship-overview)
- [Repository Information](#repository-information)
- [Learning Objectives](#learning-objectives)
- [Week 1 — Foundation and Project Selection](#week-1--foundation-and-project-selection)
  - [Week 1 Objectives](#week-1-objectives)
  - [Linux Fundamentals](#linux-fundamentals)
  - [Git and GitHub Practice](#git-and-github-practice)
  - [Project Selection](#project-selection)
  - [Environment Setup](#environment-setup)
  - [Week 1 Deliverables](#week-1-deliverables)
- [Week 2 — CI/CD Pipeline Project](#week-2--cicd-pipeline-project)
  - [Project Overview](#project-overview)
  - [Project Objectives](#project-objectives)
  - [Technologies Used](#technologies-used)
  - [Project Architecture](#project-architecture)
  - [Project Structure](#project-structure)
  - [Application Development](#application-development)
  - [Automated Testing](#automated-testing)
  - [Dockerization](#dockerization)
  - [GitHub Actions CI/CD](#github-actions-cicd)
  - [AWS EC2 Deployment](#aws-ec2-deployment)
  - [Deployment Workflow](#deployment-workflow)
  - [Troubleshooting](#troubleshooting)
  - [Verification](#verification)
  - [Week 2 Deliverables](#week-2-deliverables)
- [Key Learnings](#key-learnings)
- [Future Improvements](#future-improvements)
- [Conclusion](#conclusion)
- [Project Status](#project-status)
- [Author](#author)

---

## Learning Objectives

During this internship, my primary objectives are:

- Strengthen Linux and Git fundamentals.
- Understand DevOps principles and workflows.
- Automate repetitive tasks using scripts and CI/CD pipelines.
- Learn application containerization using Docker.
- Implement automated testing.
- Deploy applications on AWS infrastructure.
- Improve troubleshooting and debugging skills.
- Maintain clear technical documentation.
- Build practical projects for my DevOps portfolio.

---

## Week 1 — Foundation and Project Selection

### Week 1 Overview

The first week focused on building a strong foundation in Linux, Git, GitHub, project planning, and development environment setup.

The main objective was to understand the basic tools used in DevOps and select a practical project for implementation during the upcoming weeks.

### Week 1 Objectives

- Understand essential Linux commands.
- Practice file and directory management.
- Learn Git branching and collaboration workflows.
- Practice Git history management.
- Understand Git merge conflicts.
- Learn how to use Git stash and reset.
- Configure the development environment.
- Select suitable DevOps projects.
- Document the project plan.

---

### Linux Fundamentals

Linux is an important part of DevOps because most cloud servers, containers, and CI/CD environments use Linux-based systems.

#### Topics Practiced

- Linux directory structure.
- File and directory navigation.
- File creation and deletion.
- File permissions.
- File ownership.
- Process management.
- Package management.
- Disk-space monitoring.
- Basic system information.
- Command-line troubleshooting.

#### Commands Practiced

```bash
pwd
ls
ls -la
cd
mkdir
touch
cp
mv
rm
cat
less
head
tail
grep
find
chmod
chown
ps
top
df -h
du -sh
free -h
uname -a
```

**Example: Checking Disk Usage**

```bash
df -h
```

This command displays the available and used disk space of mounted filesystems.

**Example: Searching for Text**

```bash
grep -n "keyword" filename
```

This command searches for a specific keyword in a file and displays the matching line numbers.

---

### Git and GitHub Practice

Git is used to track code changes, maintain project history, and collaborate with other developers.

During Week 1, I practiced different Git operations using the internship repository.

#### Git Topics Practiced

- Initializing and cloning repositories.
- Checking repository status.
- Creating commits.
- Working with branches.
- Merging branches.
- Resolving merge conflicts.
- Using Git stash.
- Resetting commits.
- Viewing commit history.
- Working with remote repositories.
- Pulling and pushing changes.

#### Important Git Commands

```bash
git clone <repository-url>
git status
git add .
git commit -m "commit message"
git log --oneline
git branch
git switch -c feature-branch
git switch main
git merge feature-branch
git stash
git stash pop
git reset
git pull origin main
git push origin main
```

#### Git Workflow Practiced

```
Create or modify files
        ↓
Check repository status
        ↓
Stage changes
        ↓
Create a commit
        ↓
Pull remote changes
        ↓
Resolve conflicts if required
        ↓
Push changes to GitHub
```

#### Git Concepts Learned

**Working Directory**
The location where files are created or modified.

**Staging Area**
The intermediate area where changes are prepared before committing.

**Commit**
A saved snapshot of changes in the Git history.

**Branch**
An independent line of development.

**Merge**
The process of combining changes from different branches.

**Git Stash**
A temporary storage area for uncommitted changes.

**Git Reset**
A command used to move the current branch reference to another commit.

---

### Project Selection

After reviewing the available project options, I selected the following projects for implementation:

#### Selected Project 1: CI/CD Pipeline

The objective of this project is to create an automated pipeline that:

- Runs automated tests.
- Builds a Docker image.
- Deploys the application to an AWS EC2 instance.
- Automatically updates the application after changes are pushed to GitHub.

#### Selected Project 2: Kubernetes Deployment

The objective of this project is to deploy an application on Kubernetes and practice:

- Container orchestration.
- Deployments.
- Services.
- Scaling.
- Application availability.
- Kubernetes configuration management.

> The CI/CD project was selected for implementation during Week 2.

---

### Environment Setup

The development environment was prepared using the following tools:

| Tool | Purpose |
|---|---|
| Ubuntu on WSL | Linux-based development environment |
| Git | Version control |
| GitHub | Remote repository hosting |
| Python | Application development |
| Pytest | Automated testing |
| Docker | Application containerization |
| GitHub Actions | CI/CD automation |
| AWS EC2 | Cloud deployment |

#### Environment Verification

```bash
git --version
python3 --version
pytest --version
docker --version
```

#### Docker Verification

```bash
docker run --rm hello-world
```

This command was used to verify that Docker was installed and working correctly.

---

### Week 1 Deliverables

The following activities were completed during Week 1:

- [x] Linux fundamentals practice.
- [x] Git and GitHub practice.
- [x] Branching and merging exercises.
- [x] Merge-conflict practice.
- [x] Git stash and reset practice.
- [x] Project selection documentation.
- [x] Development environment setup.
- [x] Initial repository configuration.

#### Week 1 Outcome

By the end of Week 1, I developed a better understanding of Linux and Git fundamentals and prepared the environment required for the CI/CD project.

---

## Week 2 — CI/CD Pipeline Project

### Project Overview

The Week 2 project focuses on developing and implementing an automated Continuous Integration and Continuous Deployment pipeline.

The project uses a Python application, Docker, GitHub Actions, and AWS EC2.

The pipeline automatically tests the application, builds a Docker image, connects to an AWS EC2 instance, and deploys the latest version of the application.

**Project Name:** Automated CI/CD Pipeline with GitHub Actions, Docker, and AWS EC2

### Project Objectives

The main objectives of this project are:

- Develop a simple Python web application.
- Write automated unit tests.
- Containerize the application using Docker.
- Create a GitHub Actions workflow.
- Automatically run tests on code changes.
- Build a Docker image.
- Deploy the application to AWS EC2.
- Automatically restart the application after deployment.
- Verify the deployed application.
- Document the complete workflow.

### Technologies Used

| Technology | Purpose |
|---|---|
| Python | Application development |
| HTTP Server | Serving the web application |
| Pytest | Automated testing |
| Git | Version control |
| GitHub | Source-code hosting |
| GitHub Actions | CI/CD automation |
| Docker | Containerization |
| AWS EC2 | Application hosting |
| Ubuntu | Server operating system |
| SSH | Secure remote server access |

### Project Architecture

```
                   Developer
                      |
                      |
                Git Push
                      |
                      ▼
                 GitHub
                      |
                      ▼
              GitHub Actions
                      |
          ┌───────────┴───────────┐
          ▼                       ▼
     Run Pytest              Build Docker Image
          |                       |
          └───────────┬───────────┘
                      |
                      ▼
                SSH into EC2
                      |
                      ▼
              Pull Latest Code
                      |
                      ▼
              Build Docker Image
                      |
                      ▼
          Stop Previous Container
                      |
                      ▼
           Start Updated Container
                      |
                      ▼
                AWS EC2
                      |
                      ▼
             Running Application
                Port: 5000
```

### Project Structure

```
REPO-DD8280B8/
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
├── Week1/
│   └── project-selection.md
│
├── Week2/
│   ├── progress-notes.md
│   │
│   └── cicd-project/
│       ├── app/
│       │   ├── __init__.py
│       │   └── app.py
│       │
│       ├── tests/
│       │   └── test_app.py
│       │
│       ├── Dockerfile
│       ├── requirements.txt
│       ├── pytest.ini
│       └── .gitignore
│
└── README.md
```

### Application Development

#### Application Description

The application is a lightweight Python web application built using Python's built-in `http.server` module.

It displays a modern DevOps-themed dashboard containing information about the CI/CD deployment process.

The application listens on port 5000.

#### Application Features

The application includes:

- DevOps-themed dashboard.
- CI/CD deployment status.
- Docker information.
- GitHub Actions information.
- AWS EC2 deployment information.
- Dynamic deployment-success message.
- Responsive HTML and CSS interface.
- Lightweight Python HTTP server.
- No external web framework dependency.

#### Application Message

The application dynamically displays the following message:

> 🚀 CI/CD Pipeline Successful — Application Deployed to AWS EC2!

The message is generated using the Python function below:

```python
def get_message():
    return "🚀 CI/CD Pipeline Successful — Application Deployed to AWS EC2!"
```

The HTML page uses a placeholder that is replaced dynamically before the response is sent to the client.

```python
page = HTML.replace("{{SUCCESS_MESSAGE}}", get_message())
```

#### Running the Application Locally

Navigate to the project directory:

```bash
cd Week2/cicd-project
```

Run the application:

```bash
python3 app/app.py
```

The application runs on:

```
http://localhost:5000
```

Open the URL in a browser to view the dashboard.

### Automated Testing

#### Testing Overview

Automated testing is used to verify that the application's core functionality works correctly before the Docker image is built and deployed.

The project uses **pytest** for unit testing.

#### Test Cases

The project includes tests for the `add()` function.

**Test Case 1: Adding Positive Numbers**

```python
def test_add():
    assert add(2, 3) == 5
```

**Test Case 2: Adding Negative Numbers**

```python
def test_add_negative_numbers():
    assert add(-2, -3) == -5
```

#### Running Tests Locally

Navigate to the project directory:

```bash
cd Week2/cicd-project
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the tests:

```bash
pytest
```

Expected result:

```
2 passed
```

#### Testing Configuration

The project uses the following `pytest.ini` configuration:

```ini
[pytest]
pythonpath = .
```

This configuration allows the test files to import the application package correctly.

### Dockerization

#### Dockerfile

The application is containerized using the following Dockerfile:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/

EXPOSE 5000

CMD ["python3", "app/app.py"]
```

#### Dockerfile Explanation

| Instruction | Description |
|---|---|
| `FROM` | Uses Python 3.12 Slim as the base image |
| `WORKDIR` | Sets the working directory inside the container |
| `COPY` | Copies project files into the image |
| `RUN` | Installs Python dependencies |
| `EXPOSE` | Documents the application port |
| `CMD` | Starts the Python application |

#### Build the Docker Image

Run the following command from the `Week2/cicd-project` directory:

```bash
docker build -t cicd-project:1.0 .
```

#### Run the Docker Container

```bash
docker run -d \
  --name cicd-app \
  --restart unless-stopped \
  -p 5000:5000 \
  cicd-project:1.0
```

#### Check Running Containers

```bash
docker ps
```

#### View Container Logs

```bash
docker logs cicd-app
```

#### Stop the Container

```bash
docker stop cicd-app
```

#### Remove the Container

```bash
docker rm cicd-app
```

#### Test the Containerized Application

```bash
curl http://localhost:5000
```

The command should return the application's HTML response.

### GitHub Actions CI/CD

#### CI/CD Overview

GitHub Actions is used to automate the testing, Docker image building, and deployment process.

The workflow is triggered when code is pushed to the `main` branch or when a pull request targets the `main` branch.

#### Workflow Stages

The pipeline contains the following stages:

1. Test
2. Build
3. Deploy

**Stage 1: Test**

The test job performs the following operations:

- Checks out the repository.
- Sets up Python 3.12.
- Installs project dependencies.
- Runs the Pytest test suite.

The test job must complete successfully before the build job starts.

**Stage 2: Build**

The build job:

- Checks out the repository.
- Builds the Docker image.
- Uses the project Dockerfile.
- Confirms that the application can be packaged into a Docker image.

**Stage 3: Deploy**

The deployment job:

- Runs only after the test and build jobs succeed.
- Connects to AWS EC2 using SSH.
- Pulls the latest code from GitHub.
- Builds the latest Docker image on EC2.
- Removes the previous application container.
- Starts a new container.
- Exposes the application on port 5000.

#### GitHub Actions Workflow

The workflow file is located at:

```
.github/workflows/ci-cd.yml
```

Example workflow:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: Week2/cicd-project

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run tests
        run: pytest

  build:
    needs: test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Build Docker image
        run: docker build -t cicd-project:1.0 Week2/cicd-project

  deploy:
    name: Deploy to AWS EC2
    needs: build
    runs-on: ubuntu-latest

    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - name: Deploy application to EC2
        uses: appleboy/ssh-action@v1.2.2
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}

          script: |
            set -e

            echo "Connected to EC2 successfully!"

            cd ~/intern/REPO-DD8280B8

            echo "Pulling latest code..."
            git pull origin main

            cd Week2/cicd-project

            echo "Building the latest Docker image..."
            sudo docker build -t cicd-project:1.0 .

            echo "Stopping the previous container..."
            sudo docker rm -f cicd-app || true

            echo "Starting the updated container..."
            sudo docker run -d \
              --name cicd-app \
              --restart unless-stopped \
              -p 5000:5000 \
              cicd-project:1.0

            echo "Checking running containers..."
            sudo docker ps

            echo "Deployment completed successfully!"
```

> The deployment path must match the actual location of the repository on the EC2 instance.

### AWS EC2 Deployment

#### Deployment Environment

The application was deployed to an AWS EC2 instance running Ubuntu.

The EC2 instance is used as the hosting environment for the Dockerized application.

#### EC2 Deployment Requirements

The following components were configured:

- Ubuntu-based EC2 instance.
- Docker installation.
- Git installation.
- GitHub repository clone.
- SSH access.
- Inbound TCP port 5000.
- GitHub Actions repository secrets.

#### GitHub Actions Secrets

The following secrets were configured in the GitHub repository:

| Secret | Purpose |
|---|---|
| `EC2_HOST` | Public IP address or hostname of the EC2 instance |
| `EC2_USER` | EC2 SSH username |
| `EC2_SSH_KEY` | Private SSH key used by GitHub Actions |

> Private keys and sensitive credentials must never be committed to the GitHub repository.

#### Clone the Repository on EC2

```bash
mkdir -p ~/intern
cd ~/intern
git clone https://github.com/Kasim2908/REPO-DD8280B8.git
```

Navigate to the project:

```bash
cd ~/intern/REPO-DD8280B8/Week2/cicd-project
```

#### Build the Application on EC2

```bash
sudo docker build -t cicd-project:1.0 .
```

#### Run the Application on EC2

```bash
sudo docker rm -f cicd-app 2>/dev/null || true

sudo docker run -d \
  --name cicd-app \
  --restart unless-stopped \
  -p 5000:5000 \
  cicd-project:1.0
```

#### Verify the Container

```bash
sudo docker ps
```

Expected port mapping:

```
0.0.0.0:5000->5000/tcp
```

#### Test the Application on EC2

```bash
curl http://localhost:5000
```

The application should return the HTML dashboard.

#### Access the Application in a Browser

```
http://<EC2-PUBLIC-IP>:5000
```

Replace `<EC2-PUBLIC-IP>` with the current public IP address of the EC2 instance.

### Deployment Workflow

The complete deployment process works as follows:

```
1. Developer modifies the application
              |
              ▼
2. Developer commits the changes
              |
              ▼
3. Developer pushes changes to main
              |
              ▼
4. GitHub Actions workflow starts
              |
              ▼
5. Python dependencies are installed
              |
              ▼
6. Automated tests are executed
              |
              ▼
7. Docker image is built
              |
              ▼
8. GitHub Actions connects to EC2
              |
              ▼
9. EC2 pulls the latest GitHub code
              |
              ▼
10. EC2 builds the updated Docker image
              |
              ▼
11. Previous container is removed
              |
              ▼
12. Updated container is started
              |
              ▼
13. Application becomes available on port 5000
```

### Troubleshooting

#### Issue 1: Pytest Import Error

**Problem**

The test suite initially failed because Python could not locate the application module.

**Error**

```
ModuleNotFoundError
```

**Solution**

A `pytest.ini` file was created:

```ini
[pytest]
pythonpath = .
```

After the configuration was added, the tests passed successfully.

#### Issue 2: Docker Permission Denied

**Problem**

Docker commands on the EC2 instance returned a permission error while accessing the Docker socket.

**Error**

```
permission denied while trying to connect to the Docker daemon socket
```

**Solution**

Docker commands were executed using `sudo`:

```bash
sudo docker ps
sudo docker build -t cicd-project:1.0 .
sudo docker run ...
```

**Future Improvement**

The EC2 user can be added to the Docker group:

```bash
sudo usermod -aG docker $USER
```

After logging out and logging in again, Docker commands may be executed without `sudo`.

#### Issue 3: Incorrect Repository Path

**Problem**

The deployment script initially used an incorrect repository path.

Incorrect path:

```bash
cd ~/REPO-DD8280B8
```

Correct path:

```bash
cd ~/intern/REPO-DD8280B8
```

The deployment workflow was updated to use the correct path.

#### Issue 4: SSH Authentication Failure

**Problem**

GitHub Actions initially failed to authenticate with the EC2 instance.

**Possible Causes**

- Incorrect private key in GitHub Secrets.
- Incorrect EC2 public IP address.
- Incorrect EC2 username.
- Incorrect public key in `authorized_keys`.

**Solution**

The SSH key configuration was checked and the GitHub Actions secret was updated.

The following values were verified:

```
EC2_HOST   = Current EC2 public IP
EC2_USER   = ubuntu
EC2_SSH_KEY = Correct private SSH key
```

#### Issue 5: Application Message Was Not Updated

**Problem**

The application contained a dynamic Python function, but the HTML page displayed a hardcoded message.

**Cause**

The `get_message()` function was not being used while generating the HTML response.

**Solution**

The HTML page was updated to use a placeholder:

```
{{SUCCESS_MESSAGE}}
```

The placeholder was replaced dynamically in the request handler:

```python
page = HTML.replace("{{SUCCESS_MESSAGE}}", get_message())
```

This ensured that the message returned by `get_message()` appeared in the web application.

#### Issue 6: Docker Container Permission Error

**Problem**

The container could not be inspected using Docker commands without elevated permissions.

**Solution**

The following commands were used:

```bash
sudo docker ps
sudo docker logs cicd-app
sudo docker exec cicd-app <command>
```

### Verification

The deployment was verified using the following checks.

**Check 1: GitHub Actions**

The following workflow jobs completed successfully:

- [x] Test
- [x] Build
- [x] Deploy

**Check 2: Docker Container**

```bash
sudo docker ps
```

The `cicd-app` container was running successfully.

**Check 3: Application Response**

```bash
curl -s http://localhost:5000
```

The application returned the expected HTML response.

**Check 4: Dynamic Success Message**

The application response contained:

```
🚀 CI/CD Pipeline Successful — Application Deployed to AWS EC2!
```

**Check 5: Container Code Verification**

The dynamic rendering logic was verified inside the running container:

```bash
sudo docker exec cicd-app grep -n "HTML.replace" /app/app/app.py
```

Expected output:

```python
page = HTML.replace("{{SUCCESS_MESSAGE}}", get_message())
```

### Week 2 Deliverables

The following tasks were completed during Week 2:

- [x] Developed a Python web application.
- [x] Created a modern application dashboard.
- [x] Added automated unit tests.
- [x] Configured Pytest.
- [x] Created a Dockerfile.
- [x] Built a Docker image.
- [x] Ran the application inside a Docker container.
- [x] Created a GitHub Actions workflow.
- [x] Automated testing.
- [x] Automated Docker image building.
- [x] Configured SSH-based EC2 deployment.
- [x] Deployed the application to AWS EC2.
- [x] Configured GitHub Actions secrets.
- [x] Troubleshot deployment and authentication issues.
- [x] Verified the running application.
- [x] Implemented a dynamic deployment-success message.

---

## Key Learnings

During Weeks 1 and 2, I learned the following concepts:

**Linux**

- Linux is essential for managing servers and cloud infrastructure.
- Command-line tools help troubleshoot system and application issues.
- Disk-space monitoring is important for reliable deployments.

**Git and GitHub**

- Git helps track and manage project changes.
- Branches support parallel development.
- Merge conflicts must be resolved carefully.
- Remote synchronization is important when working with deployment servers.

**Docker**

- Docker packages applications and dependencies into portable containers.
- Dockerfiles define how application images are built.
- Containers simplify application deployment.
- Container ports must be mapped correctly to access applications.

**CI/CD**

- Automated testing helps detect problems before deployment.
- GitHub Actions can automate repetitive development tasks.
- Job dependencies control the execution order of pipeline stages.
- Deployment jobs should run only after successful testing and building.

**AWS EC2**

- EC2 provides virtual servers for hosting applications.
- Security groups control inbound and outbound traffic.
- SSH is used for secure remote server access.
- The server environment must be configured correctly before deployment.

**Troubleshooting**

- Error messages should be examined before making changes.
- The application should be tested at multiple levels.
- Source code, Docker images, containers, and browser responses may differ.
- Commands such as `grep`, `curl`, `docker ps`, and `docker exec` are useful for debugging.

---

## Future Improvements

The following improvements can be implemented in future iterations:

- Push Docker images to Docker Hub or Amazon ECR.
- Add Docker image vulnerability scanning using Trivy.
- Add code-quality checks.
- Add code-coverage reporting.
- Use environment variables for configuration.
- Add health checks to the Docker container.
- Implement zero-downtime deployment.
- Use a reverse proxy such as Nginx.
- Configure HTTPS using TLS certificates.
- Add monitoring using Prometheus and Grafana.
- Add centralized logging.
- Use AWS Systems Manager instead of direct SSH deployment.
- Improve EC2 security-group rules.
- Restrict SSH access to trusted IP addresses.
- Add deployment rollback functionality.
- Use infrastructure as code with Terraform.

---

## Conclusion

Weeks 1 and 2 helped establish a practical foundation in DevOps.

During Week 1, I practiced Linux, Git, GitHub, project planning, and environment setup.

During Week 2, I developed a Python application, created automated tests, containerized the application using Docker, and implemented a GitHub Actions CI/CD pipeline for deployment to AWS EC2.

The final deployment workflow successfully automated the following process:

```
Code Push
   ↓
Automated Testing
   ↓
Docker Image Build
   ↓
EC2 Connection
   ↓
Latest Code Pull
   ↓
Docker Deployment
   ↓
Running Application
```

This project improved my understanding of automation, containerization, cloud deployment, CI/CD workflows, and practical DevOps troubleshooting.

---

## Project Status

| Component | Status |
|---|---|
| Linux Fundamentals | Completed |
| Git and GitHub Practice | Completed |
| Project Selection | Completed |
| Python Application | Completed |
| Automated Testing | Completed |
| Dockerization | Completed |
| GitHub Actions Pipeline | Completed |
| AWS EC2 Deployment | Completed |
| Dynamic Application Message | Completed |
| Documentation | In Progress |

---

## Author

**Mohammad Kasim**
B.Tech Computer Science and Engineering Student

GitHub: [Kasim2908](https://github.com/Kasim2908)
