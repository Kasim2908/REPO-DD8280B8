# Week 4 — Day 1
## Kubernetes Theory & Concept Revision

---

## 📌 Objective

Day 1 of Week 4 was focused on revising the core concepts of **Kubernetes and container orchestration** before starting the hands-on Kubernetes deployment project.

The objective was to understand Kubernetes architecture, its major components, workload resources, networking concepts, configuration management, and the basic workflow of deploying an application.

---

## 📑 Table of Contents

1. [What is Kubernetes?](#1-what-is-kubernetes)
2. [Why Kubernetes?](#2-why-kubernetes)
3. [Kubernetes Architecture](#3-kubernetes-architecture)
4. [Control Plane](#4-control-plane)
5. [Worker Node](#5-worker-node)
6. [Pod](#6-pod)
7. [Node](#7-node)
8. [Kubernetes Cluster](#8-kubernetes-cluster)
9. [Deployment](#9-deployment)
10. [ReplicaSet](#10-replicaset)
11. [Kubernetes Service](#11-kubernetes-service)
12. [ConfigMap](#12-configmap)
13. [Secret](#13-secret)
14. [Namespace](#14-namespace)
15. [Ingress](#15-ingress)
16. [Kubernetes YAML](#16-kubernetes-yaml)
17. [kubectl](#17-kubectl)
18. [Kubernetes Application Flow](#18-kubernetes-application-flow)
19. [Desired State vs Current State](#19-desired-state-vs-current-state)
20. [Key Concepts Revised](#20-key-concepts-revised)

---

## 1. What is Kubernetes?

**Kubernetes (K8s)** is an open-source container orchestration platform used to deploy, manage, scale, and maintain containerized applications.

Docker is mainly responsible for running containers, while Kubernetes helps manage containers across a cluster.

### Without Kubernetes

```text
Developer
    ↓
Build Container
    ↓
Run Container
    ↓
Container Crashes
    ↓
Manual Restart
```

### With Kubernetes

```text
Developer
    ↓
Container Image
    ↓
Kubernetes
    ↓
Deployment
    ↓
Pods
    ↓
Service
```

Kubernetes continuously works toward maintaining the **desired state** defined by the user.

---

## 2. Why Kubernetes?

Kubernetes helps solve problems related to:

- Container management
- Application deployment
- Scaling
- Self-healing
- Service discovery
- Load distribution
- Rolling updates
- Resource management
- Container orchestration

For example, if the desired number of application replicas is 3 and one Pod fails, Kubernetes can create a replacement Pod to maintain the desired state.

```text
Desired Replicas = 3

Pod 1 ✅
Pod 2 ❌
Pod 3 ✅

        ↓

Kubernetes creates replacement

Pod 1 ✅
Pod 3 ✅
Pod 4 ✅
```

---

## 3. Kubernetes Architecture

A Kubernetes cluster consists mainly of a **Control Plane** and **Worker Nodes**.

```text
                  Kubernetes Cluster
                         │
             ┌───────────┴───────────┐
             │                       │
       Control Plane             Worker Node
             │                       │
       ┌─────┼─────┐           ┌─────┼─────┐
       ↓     ↓     ↓           ↓     ↓     ↓
     API  Scheduler  etcd      Pod   Pod   Pod
```

---

## 4. Control Plane

The Control Plane manages the Kubernetes cluster and makes decisions about the desired state of applications.

Major components include:

### API Server

The API Server is the main entry point for communication with Kubernetes.

When using:

```bash
kubectl get pods
```

`kubectl` communicates with the Kubernetes API Server.

### Scheduler

The Scheduler decides which worker node should run a newly created Pod.

```text
New Pod
   ↓
Scheduler
   ↓
Select suitable Node
   ↓
Pod scheduled
```

### etcd

etcd is a distributed key-value store used by Kubernetes to store cluster state and configuration information.

It contains information related to resources such as:

- Pods
- Deployments
- Services
- Cluster configuration
- Desired state

### Controller Manager

Controllers continuously compare the **Desired State** against the **Current State**.

If there is a difference, controllers work to bring the cluster back toward the desired state.

Example:

```text
Desired = 3 Pods
Current = 2 Pods

Controller
    ↓
Creates another Pod
    ↓
Current = 3 Pods
```

---

## 5. Worker Node

A Worker Node is a machine where application workloads actually run.

A worker node commonly contains:

```text
Worker Node
│
├── kubelet
├── Container Runtime
└── kube-proxy
```

### kubelet

The kubelet communicates with the Kubernetes control plane and ensures that the Pods assigned to the node are running.

### Container Runtime

The container runtime is responsible for running containers.

Examples:

- containerd
- CRI-O

### kube-proxy

kube-proxy helps implement networking rules required for Kubernetes Services.

---

## 6. Pod

A Pod is the **smallest deployable unit** in Kubernetes.

A Pod normally contains one application container:

```text
Pod
└── Application Container
```

A Pod can also contain multiple tightly coupled containers:

```text
Pod
├── Application Container
└── Sidecar Container
```

For this project, the common pattern will be:

```text
1 Pod
└── 1 Container
```

---

## 7. Node

A Node is a physical or virtual machine that runs Kubernetes workloads.

Example:

```text
Kubernetes Cluster

Node 1
├── Pod
├── Pod
└── Pod

Node 2
├── Pod
└── Pod
```

---

## 8. Kubernetes Cluster

A Kubernetes Cluster is a collection of the control plane and worker nodes.

```text
                Kubernetes Cluster
                       │
             ┌─────────┴─────────┐
             │                   │
       Control Plane        Worker Node
                                 │
                          ┌──────┼──────┐
                          ↓      ↓      ↓
                         Pod    Pod    Pod
```

For local development, **Minikube** can be used to create a Kubernetes cluster on a local machine.

---

## 9. Deployment

A Deployment manages application Pods and helps maintain the desired number of replicas.

Instead of manually creating multiple Pods, we can define:

```yaml
replicas: 3
```

Kubernetes then maintains the required number of Pods.

```text
Deployment
     │
     ↓
ReplicaSet
     │
 ┌───┼───┐
 ↓   ↓   ↓
Pod Pod Pod
```

Deployments also support features such as:

- Scaling
- Rolling updates
- Rollbacks
- Replica management

---

## 10. ReplicaSet

A ReplicaSet ensures that the desired number of Pod replicas are running.

Example:

```yaml
replicas: 3
```

Means Kubernetes attempts to maintain:

```text
Pod 1 ✅
Pod 2 ✅
Pod 3 ✅
```

If one Pod disappears:

```text
Pod 1 ❌
Pod 2 ✅
Pod 3 ✅
```

The ReplicaSet creates another Pod:

```text
Pod 2 ✅
Pod 3 ✅
Pod 4 ✅
```

> In normal application deployment, we generally manage **Deployments** rather than directly managing ReplicaSets.

---

## 11. Kubernetes Service

Pods are temporary and their IP addresses can change.

A Service provides a **stable way to access a group of Pods**.

```text
             Service
                │
       ┌────────┼────────┐
       ↓        ↓        ↓
     Pod 1    Pod 2    Pod 3
```

Common Service types:

- ClusterIP
- NodePort
- LoadBalancer

### ClusterIP

The default Service type. It provides internal access within the Kubernetes cluster.

```text
Application
     ↓
Service
     ↓
Pods
```

### NodePort

Exposes an application through a port on the Kubernetes node.

```text
Browser
   ↓
NodeIP:NodePort
   ↓
Service
   ↓
Pods
```

### LoadBalancer

Commonly used with cloud environments to expose applications through a cloud load balancer.

```text
Internet
   ↓
Cloud Load Balancer
   ↓
Service
   ↓
Pods
```

---

## 12. ConfigMap

A ConfigMap stores **non-sensitive** configuration data.

Examples:

```text
APP_ENV=production
APP_PORT=5000
```

This allows configuration to be separated from the application container image.

```text
Application
     +
ConfigMap
```

---

## 13. Secret

A Kubernetes Secret is used to store sensitive configuration such as:

- Passwords
- API tokens
- Credentials
- Sensitive configuration

Example:

```text
Application
     ↓
Secret
     ↓
Database Credentials
```

> ⚠️ Secrets should be handled carefully and should not be treated as a complete replacement for a dedicated secret-management system.

---

## 14. Namespace

A Namespace provides logical separation of Kubernetes resources.

Example:

```text
Cluster
│
├── development
│   ├── Pods
│   └── Services
│
├── staging
│   ├── Pods
│   └── Services
│
└── production
    ├── Pods
    └── Services
```

Namespaces are useful for:

- Organization
- Resource separation
- Environment separation
- Access control

---

## 15. Ingress

Ingress provides a way to manage external HTTP/HTTPS access to applications running inside a Kubernetes cluster.

Basic flow:

```text
Internet
   ↓
Ingress
   ↓
Service
   ↓
Pods
```

Ingress can route traffic based on hosts or paths.

Example:

```text
example.com/
      ↓
Frontend Service

example.com/api
      ↓
Backend Service
```

---

## 16. Kubernetes YAML

Kubernetes resources are commonly defined using YAML manifests.

Basic structure:

```yaml
apiVersion: apps/v1

kind: Deployment

metadata:
  name: my-app

spec:
  replicas: 3

  selector:
    matchLabels:
      app: my-app

  template:
    metadata:
      labels:
        app: my-app

    spec:
      containers:
        - name: my-app
          image: my-image:latest
          ports:
            - containerPort: 5000
```

### Important YAML fields

```text
apiVersion
kind
metadata
spec
```

These four fields are fundamental when working with Kubernetes manifests.

---

## 17. kubectl

`kubectl` is the command-line tool used to communicate with a Kubernetes cluster.

### Check Nodes

```bash
kubectl get nodes
```

### Check Pods

```bash
kubectl get pods
```

### Check Deployments

```bash
kubectl get deployments
```

### Check Services

```bash
kubectl get services
```

### Describe a Pod

```bash
kubectl describe pod <pod-name>
```

### View Pod Logs

```bash
kubectl logs <pod-name>
```

### Apply a Manifest

```bash
kubectl apply -f deployment.yaml
```

### Delete Resources

```bash
kubectl delete -f deployment.yaml
```

---

## 18. Kubernetes Application Flow

The overall application architecture can be understood as:

```text
                    USER
                      │
                      ↓
                   Ingress
                      │
                      ↓
                   Service
                      │
          ┌───────────┼───────────┐
          ↓           ↓           ↓
        Pod 1       Pod 2       Pod 3
          │           │           │
      Container   Container   Container
          │           │           │
          └───────────┼───────────┘
                      ↑
                 Deployment
                      ↑
                 ReplicaSet
```

The Kubernetes cluster underneath contains the control plane and worker nodes responsible for managing and running these workloads.

---

## 19. Desired State vs Current State

One of the most important Kubernetes concepts is **desired state management**.

Example:

```text
Desired State
3 replicas
     │
     ↓
Kubernetes
     │
     ↓
Current State
3 replicas
```

If the current state changes:

```text
Desired = 3

Current = 2
```

Kubernetes detects the difference and attempts to correct it:

```text
Current = 2
     ↓
Kubernetes
     ↓
Create replacement Pod
     ↓
Current = 3
```

This principle is fundamental to Kubernetes automation and self-healing.

---

## 20. Key Concepts Revised

| Concept       | Purpose                              |
|---------------|--------------------------------------|
| Kubernetes    | Container orchestration              |
| Cluster       | Complete Kubernetes environment      |
| Control Plane | Manages the cluster                  |
| Node          | Runs workloads                       |
| Pod           | Smallest deployable unit             |
| Container     | Runs application process             |
| Deployment    | Manages application Pods             |
| ReplicaSet    | Maintains Pod replicas               |
| Service       | Provides stable network access       |
| ConfigMap     | Stores non-sensitive configuration   |
| Secret        | Stores sensitive configuration       |
| Namespace     | Logical resource separation          |
| Ingress       | HTTP/HTTPS traffic routing           |
| kubectl       | Kubernetes CLI                       |

---

## 🎯 Day 1 Learning Checklist

- [x] Understand Kubernetes
- [x] Understand container orchestration
- [x] Understand Kubernetes architecture
- [x] Understand Control Plane
- [x] Understand Worker Nodes
- [x] Understand Pods
- [x] Understand Deployments
- [x] Understand ReplicaSets
- [x] Understand Services
- [x] Understand ClusterIP
- [x] Understand NodePort
- [x] Understand LoadBalancer
- [x] Understand ConfigMaps
- [x] Understand Secrets
- [x] Understand Namespaces
- [x] Understand Ingress
- [x] Understand Kubernetes YAML
- [x] Revise basic kubectl commands
- [x] Understand Desired State vs Current State

---

## 💡 Key Takeaways

1. Kubernetes is a container orchestration platform.
2. A Pod is the smallest deployable unit.
3. A Deployment manages application Pods.
4. A ReplicaSet maintains the desired number of Pod replicas.
5. A Service provides stable access to Pods.
6. ConfigMaps store non-sensitive configuration.
7. Secrets are intended for sensitive configuration.
8. Namespaces logically separate resources.
9. Ingress manages external HTTP/HTTPS routing.
10. Kubernetes continuously works toward maintaining the desired state.

---

## 🏁 Day 1 Status

**Status: COMPLETED ✅**

Day 1 successfully completed the theoretical revision required before beginning the hands-on Kubernetes deployment project.

---

## ➡️ Next

**Day 2 — Kubernetes Project Setup & First Deployment** ☸️🚀
