# Week 4: Kubernetes Hands-On Project

## Overview

This project demonstrates practical Kubernetes concepts through deploying and managing an Nginx application in a local Kubernetes cluster. It covers Deployments and Services along with health probes and troubleshooting. It also demonstrates ConfigMaps Secrets and Namespaces.

The project was completed as part of the DevOps Engineering Self-Learning Internship Program.

## Objectives

- Understand Kubernetes architecture and core resources.
- Deploy an Nginx application using a Deployment.
- Expose the application through a NodePort Service.
- Practice Pod lifecycle management and self-healing.
- Configure liveness and readiness probes.
- Manage application configuration using ConfigMaps.
- Practice Kubernetes Secrets using dummy credentials.
- Organize resources using Namespaces.
- Troubleshoot common Kubernetes issues using `kubectl`.

## Technologies Used

- Kubernetes
- Docker
- kubectl
- Nginx
- YAML
- Minikube
- WSL Ubuntu

## Project Structure

```text
Week4/
├── Readme.md
├── Day1.md
├── Day2.md
├── Day3.md
├── Day4.md
├── Day5.md
├── Day6.md
├── Day7.md
└── kubernetes-project/
    ├── namespace.yaml
    ├── deployment.yaml
    ├── service.yaml
    ├── app-config.yaml
    ├── app-secret.yaml
    ├── configmap-pod.yaml
    ├── secret-pod.yaml
    └── dev-pod.yaml
```

## Kubernetes Resources

| Resource | Name | Purpose |
|---|---|---|
| Namespace | `dev` | Isolates development resources |
| Deployment | `nginx-deployment` | Manages three Nginx replicas |
| Service | `nginx-service` | Exposes Nginx through NodePort 30080 |
| ConfigMap | `app-config` | Stores non-sensitive application configuration |
| Secret | `app-secret` | Demonstrates storing practice credentials |
| Pod | `configmap-demo` | Reads configuration from the ConfigMap |
| Pod | `secret-demo` | Reads values from the Secret |
| Pod | `dev-nginx` | Runs Nginx in the `dev` Namespace |

## Prerequisites

- Docker running correctly
- Minikube installed
- kubectl installed
- A working local Kubernetes cluster
- Git installed

Check your environment:

```bash
docker --version
kubectl version --client
minikube status
kubectl get nodes
```

## How to Run the Project

Run all commands from the root directory of the repository.

### Step 1: Start Minikube

```bash
minikube start --driver=docker --memory=2048
```

Verify the cluster:

```bash
kubectl get nodes
kubectl cluster-info
```

### Step 2: Create the Namespace

```bash
kubectl apply -f Week4/kubernetes-project/namespace.yaml
```

### Step 3: Deploy the Nginx Application

```bash
kubectl apply -f Week4/kubernetes-project/deployment.yaml
kubectl apply -f Week4/kubernetes-project/service.yaml
```

### Step 4: Apply Configuration and Secret Resources

```bash
kubectl apply -f Week4/kubernetes-project/app-config.yaml
kubectl apply -f Week4/kubernetes-project/app-secret.yaml
```

### Step 5: Create the Demo Pods

```bash
kubectl apply -f Week4/kubernetes-project/configmap-pod.yaml
kubectl apply -f Week4/kubernetes-project/secret-pod.yaml
kubectl apply -f Week4/kubernetes-project/dev-pod.yaml
```

### Step 6: Verify the Resources

```bash
kubectl get deployments
kubectl get services
kubectl get pods
kubectl get pods -n dev
kubectl get configmaps
kubectl get secrets
```

The Nginx Deployment should eventually show three available replicas. The demo Pods should reach the `Running` state.

### Step 7: Access the Nginx Application

Start port forwarding:

```bash
kubectl port-forward service/nginx-service 8080:80
```

Keep this terminal open. Open a second terminal and execute:

```bash
curl -I http://localhost:8080
```

A successful request should return an HTTP response such as `HTTP/1.1 200 OK`.

You can also open `http://localhost:8080` in your browser while port forwarding is active.

## Troubleshooting Commands

Check Pod status:

```bash
kubectl get pods -o wide
kubectl get pods -n dev
```

Inspect a Pod:

```bash
kubectl describe pod configmap-demo
kubectl describe pod secret-demo
kubectl describe pod dev-nginx -n dev
```

Inspect application logs:

```bash
kubectl logs configmap-demo
kubectl logs secret-demo
```

Inspect Deployment status:

```bash
kubectl rollout status deployment/nginx-deployment
kubectl describe deployment nginx-deployment
```

Inspect recent cluster events:

```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

## Learning Outcomes

By completing this project I practiced:

- Deploying and scaling Nginx using Kubernetes Deployments.
- Exposing an application through a Kubernetes Service.
- Accessing a service using port forwarding.
- Understanding Pod lifecycle management and self-healing.
- Configuring liveness and readiness probes.
- Injecting environment variables using ConfigMaps and Secrets.
- Managing resources across Namespaces.
- Diagnosing common Pod and cluster issues using `kubectl`.

## Security Considerations

The Secret in this project uses dummy practice credentials only.

Kubernetes Secret values are Base64-encoded by default and are not automatically encrypted merely because they are stored in a Secret resource. Do not commit real credentials or tokens to a public repository. For production use consider encryption at rest and an appropriate secrets management solution.

## Cleanup

**Warning:** These commands delete the resources created for this exercise.

```bash
kubectl delete -f Week4/kubernetes-project/dev-pod.yaml
kubectl delete -f Week4/kubernetes-project/secret-pod.yaml
kubectl delete -f Week4/kubernetes-project/configmap-pod.yaml
kubectl delete -f Week4/kubernetes-project/service.yaml
kubectl delete -f Week4/kubernetes-project/deployment.yaml
kubectl delete -f Week4/kubernetes-project/app-secret.yaml
kubectl delete -f Week4/kubernetes-project/app-config.yaml
kubectl delete -f Week4/kubernetes-project/namespace.yaml
```

Deleting the Namespace also deletes namespaced resources inside it. If you want to stop the entire local cluster instead, run:

```bash
minikube stop
```

## Conclusion

This project provided hands-on practice with core Kubernetes resources and application deployment. It strengthened my understanding of Deployments, Services, ConfigMaps, Secrets, Namespaces, health probes and troubleshooting in a local Kubernetes environment.
