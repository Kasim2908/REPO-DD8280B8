# Week 4: Kubernetes Deployment Project

## Overview

As part of my **6-Week DevOps Engineering Self-Learning Internship Program with InternCareerPath** I worked on deploying and managing applications using Kubernetes.

During Week 4 I explored Kubernetes fundamentals and implemented practical exercises covering Deployments, Services, self-healing, health probes, ConfigMaps, Secrets, Namespaces and cluster troubleshooting.

The goal was to understand how Kubernetes manages containerized applications and maintains their desired state.

## Objectives

- Understand Kubernetes architecture and core components.
- Deploy and manage applications using Kubernetes Deployments.
- Expose applications using Services.
- Understand self-healing and replica management.
- Configure liveness and readiness probes.
- Manage application configuration using ConfigMaps and Secrets.
- Organize workloads using Namespaces.
- Troubleshoot Pods and investigate cluster events.

## Technologies Used

- **Kubernetes** — Container orchestration
- **Docker** — Container runtime and image management
- **kubectl** — Kubernetes command-line tool
- **Nginx** — Sample application
- **YAML** — Kubernetes resource configuration
- **WSL Ubuntu** — Development environment

## Project Structure

```text
Week4/
├── README.md
├── Day1.md
├── Day2.md
├── Day3.md
├── Day4.md
├── Day5.md
├── Day6.md
└── Day7.md

kubernetes-project/
├── deployment.yaml
├── service.yaml
├── app-config.yaml
├── configmap-pod.yaml
├── secret-pod.yaml
└── dev-pod.yaml
```

*Note: Adjust the folder structure if your actual files are organized differently.*

## Daily Progress

### Day 1 — Kubernetes Fundamentals
- Learned Kubernetes architecture and its core components.
- Studied Pods, Nodes, Clusters, Deployments and ReplicaSets.
- Explored Services, ConfigMaps, Secrets and Namespaces.
- Practiced basic `kubectl` commands and YAML manifests.

### Day 2 — Deployments and Services
- Created an Nginx Deployment with three replicas.
- Exposed the application using a NodePort Service.
- Used port forwarding to access the application locally.
- Verified that the application returned an HTTP 200 response.

### Day 3 — Self-Healing and Troubleshooting
- Deleted a Pod to observe Kubernetes self-healing.
- Verified that the Deployment created a replacement Pod.
- Investigated a deliberately invalid container image.
- Identified `ErrImagePull` and `ImagePullBackOff` errors.

### Day 4 — Health Probes
- Configured liveness and readiness probes.
- Used HTTP GET checks on port 80.
- Inspected Deployment configuration and Pod status.
- Verified that the application remained accessible.

### Day 5 — ConfigMaps and Secrets
- Created a ConfigMap to store application configuration.
- Injected configuration values into a Pod as environment variables.
- Created a Kubernetes Secret using dummy practice credentials.
- Troubleshot a missing Secret reference and verified the corrected Pod.

**Security note:** The credentials used in this exercise were for practice only. Never commit real passwords, tokens or other sensitive values to a public repository.

### Day 6 — Namespaces
- Created a `dev` Namespace.
- Deployed an Nginx Pod inside the Namespace.
- Inspected resources across Namespaces.
- Practiced separating application resources using Kubernetes Namespaces.

### Day 7 — Cluster Review and Troubleshooting
- Reviewed Deployments and Pods across Namespaces.
- Investigated Pod restarts and cluster events.
- Observed sandbox recreation and temporary connectivity issues.
- Inspected logs for the local-path storage provisioner.
- Verified that the workloads returned to a healthy Running state.

## Architecture

```text
Developer
    |
    v
Kubernetes API
    |
    v
Deployment
    |
    v
ReplicaSet
    |
    +------ Pod 1 (Nginx)
    |
    +------ Pod 2 (Nginx)
    |
    +------ Pod 3 (Nginx)
                |
                v
          Kubernetes Service
                |
                v
          Application Access
```

## How to Run the Project

### Prerequisites

Make sure you have:

- Docker running
- A working Kubernetes cluster
- `kubectl` installed and configured
- The project YAML files available locally

Check cluster connectivity:

```bash
kubectl cluster-info
kubectl get nodes
```

### Step 1: Deploy the Application

```bash
kubectl apply -f deployment.yaml
```

Verify the Deployment:

```bash
kubectl get deployments
kubectl get pods
```

### Step 2: Create the Service

```bash
kubectl apply -f service.yaml
```

Check the Service:

```bash
kubectl get services
kubectl get endpointslices
```

### Step 3: Access the Application

Use port forwarding:

```bash
kubectl port-forward service/nginx-service 8080:80
```

Open another terminal and run:

```bash
curl -I http://localhost:8080
```

Expected result:

```text
HTTP/1.1 200 OK
```

### Step 4: Inspect Health Probes

```bash
kubectl describe deployment nginx-deployment
kubectl get pods
```

### Step 5: Inspect Configuration Resources

```bash
kubectl get configmaps
kubectl get secrets
kubectl describe configmap app-config
```

Avoid printing Secret values in terminal logs or publishing them in screenshots.

### Step 6: Inspect Namespaces and Events

```bash
kubectl get namespaces
kubectl get pods -A
kubectl get events --sort-by=.metadata.creationTimestamp
```

### Step 7: Review Logs

```bash
kubectl logs deployment/nginx-deployment
kubectl describe pods
```

## Key Learnings

- Kubernetes continuously works to maintain the desired state declared in resource manifests.
- Deployments and ReplicaSets help maintain the required number of application replicas.
- Services provide stable access to application Pods.
- Health probes help Kubernetes assess application health and readiness.
- ConfigMaps and Secrets separate configuration from application definitions.
- Namespaces help organize and isolate Kubernetes resources.
- Events and logs are essential for diagnosing application and cluster issues.

## Challenges Faced

- Troubleshooting an invalid container image.
- Resolving a missing Secret reference.
- Understanding Pod replacement and self-healing.
- Investigating Pod restarts and temporary cluster connectivity issues.
- Verifying that workloads recovered successfully after troubleshooting.

## Outcome

By the end of Week 4 I had deployed and accessed an Nginx application on Kubernetes and practiced managing its lifecycle and configuration. I also gained hands-on experience with health checks, resource isolation and troubleshooting.

This week strengthened my understanding of Kubernetes and provided a foundation for more advanced deployment workflows.

## What's Next?

The next step is to explore **Helm** for packaging Kubernetes applications and managing deployments through reusable charts.

## Internship

**Program:** DevOps Engineering Self-Learning Internship  
**Organization:** InternCareerPath  
**Week:** 4 — Kubernetes Deployment Project

---

*Learn | Build | Troubleshoot | Improve*
