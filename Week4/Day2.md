# Week 4 — Day 2: Kubernetes Deployment & Service

## 📌 Objective

The objective of Day 2 was to deploy a containerized Nginx application on a Kubernetes cluster, understand Deployments and ReplicaSets, expose the application through a NodePort Service, verify application connectivity, and practice scaling.

## 🛠️ Environment

- **Operating System:** Ubuntu on WSL2
- **Kubernetes Environment:** Docker Desktop Kubernetes
- **Kubernetes CLI:** kubectl v1.35.9
- **Cluster Node:** `desktop-control-plane`
- **Application:** Nginx
- **Container Image:** `nginx:stable`

## 1. Kubernetes Cluster Verification

Before deploying the application, I verified the cluster status.

```bash
kubectl get nodes
kubectl get namespaces
kubectl get pods -A
```

The cluster node was `Ready`, and the listed system Pods were running successfully.

## 2. Project Structure

```text
kubernetes-project/
├── deployment.yaml
└── service.yaml
```

## 3. Created a Kubernetes Deployment

Created `deployment.yaml` to deploy Nginx with two replicas.

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: nginx-deployment

spec:
  replicas: 2

  selector:
    matchLabels:
      app: nginx

  template:
    metadata:
      labels:
        app: nginx

    spec:
      containers:
        - name: nginx
          image: nginx:stable
          ports:
            - containerPort: 80
```

### Key Concepts

- **Deployment:** Manages application Pods and supports scaling and rolling updates.
- **ReplicaSet:** Maintains the desired number of Pod replicas.
- **Pod:** Runs the Nginx container.
- **Labels and selectors:** Connect the Deployment and Service to the correct Pods.

Validated the manifest before applying it:

```bash
kubectl apply --dry-run=client -f deployment.yaml
```

Created the Deployment:

```bash
kubectl apply -f deployment.yaml
```

Verified the Deployment and Pods:

```bash
kubectl get deployments
kubectl get replicasets
kubectl get pods -o wide
kubectl describe deployment nginx-deployment
```

Initially, both replicas reached the `Running` state and were ready.

## 4. Exposed Nginx Using a NodePort Service

Created `service.yaml`:

```yaml
apiVersion: v1
kind: Service

metadata:
  name: nginx-service

spec:
  type: NodePort

  selector:
    app: nginx

  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080
```

Validated and created the Service:

```bash
kubectl apply --dry-run=client -f service.yaml
kubectl apply -f service.yaml
```

Verified the Service:

```bash
kubectl get services
```

The Service used the `NodePort` type with port mapping `80:30080/TCP`.

## 5. Tested Application Connectivity

Forwarded local port `8080` to port `80` of the Kubernetes Service:

```bash
kubectl port-forward service/nginx-service 8080:80
```

In a second terminal, tested the application:

```bash
curl http://localhost:8080
```

The request returned the default Nginx welcome page, confirming that the application was reachable through the Service.

## 6. Verified Service Endpoints

Checked the Service's endpoints:

```bash
kubectl get endpoints nginx-service
```

The Service initially discovered both Nginx Pods:

```text
10.244.0.5:80
10.244.0.6:80
```

Verified the Pod labels:

```bash
kubectl get pods --show-labels
```

Both Pods had the label `app=nginx`, matching the Service selector.

Kubernetes also displayed a deprecation warning for the older Endpoints API. EndpointSlices are the recommended modern alternative.

## 7. Scaled the Deployment

Scaled Nginx from two replicas to three:

```bash
kubectl scale deployment nginx-deployment --replicas=3
```

Verified the result:

```bash
kubectl get deployments
kubectl get pods -o wide
kubectl get endpointslices \
  -l kubernetes.io/service-name=nginx-service
```

The final verification showed:

- Desired replicas: **3**
- Updated replicas: **3**
- Available replicas: **3**
- Running Nginx Pods: **3**
- Ready Pods: **3**

The Service continued to provide stable access to the application as the number of replicas increased.

## 8. Final Resource Verification

Ran:

```bash
kubectl get deployments,replicasets,pods,services
```

Final observed state:

| Resource | Name | Status |
|---|---|---|
| Deployment | `nginx-deployment` | 3/3 available |
| ReplicaSet | `nginx-deployment-6cfcb5c844` | 3/3 ready |
| Pod | Nginx replica 1 | Running |
| Pod | Nginx replica 2 | Running |
| Pod | Nginx replica 3 | Running |
| Service | `nginx-service` | NodePort, `80:30080/TCP` |

## 9. Kubernetes Traffic Flow

```text
Local Client
     |
     v
kubectl port-forward
     |
     v
nginx-service
     |
     +----------+----------+
     |          |          |
     v          v          v
   Pod 1      Pod 2      Pod 3
   Nginx      Nginx      Nginx
    :80        :80        :80
```

The Deployment manages the ReplicaSet, which maintains the desired Pod count. The Service selects the Pods using the `app=nginx` label.

## 10. Key Learnings

- Created and validated Kubernetes YAML manifests.
- Deployed an application using a Deployment.
- Understood the relationship between Deployments, ReplicaSets, and Pods.
- Exposed an application through a NodePort Service.
- Tested application connectivity using `curl` and `kubectl port-forward`.
- Verified Service selectors, Pod labels, and endpoints.
- Scaled an application from two replicas to three.
- Verified the final state of Kubernetes resources.

## ✅ Day 2 Summary

**Status: COMPLETED**

Successfully deployed Nginx on Docker Desktop Kubernetes, exposed it through a NodePort Service, verified connectivity, and scaled the application to three healthy replicas.

### Next Steps

- Save the project manifests in the internship repository.
- Continue with Kubernetes troubleshooting and resilience testing.
- Explore ConfigMaps, resource requests and limits, and application health probes.
- Document the next day's practical exercises.
