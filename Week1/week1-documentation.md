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
- [Key Learnings](#key-learnings)
- [Future Improvements](#future-improvements)
- [Conclusion](#conclusion)

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

*Details to be added as Week 2 progresses.*

---

## Key Learnings

*To be added.*

---

## Future Improvements

*To be added.*

---

## Conclusion

*To be added.*
