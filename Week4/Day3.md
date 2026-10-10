# Week 4 — Day 3: Kubernetes Self-Healing & Troubleshooting

## 📌 Objective

The objective of Day 3 was to understand Kubernetes self-healing, observe ReplicaSet reconciliation, inspect Kubernetes events, troubleshoot an image-pull failure, and verify application health after troubleshooting.

## 🛠️ Environment

- **Operating System:** Ubuntu on WSL2
- **Kubernetes Environment:** Docker Desktop Kubernetes
- **Application:** Nginx
- **Deployment:** `nginx-deployment`
- **Service:** `nginx-service`

---

## 1. Verified Deployment Health

Started by checking the current Deployment and Pods.

```bash
kubectl get deployments
kubectl get pods
```

The Deployment had three desired replicas, and all three were available.

---

## 2. Tested Kubernetes Self-Healing

Deleted one Pod managed by the Deployment.

```bash
kubectl delete pod nginx-deployment-6cfcb5c844-jmpr6
```

Monitored the Pods:

```bash
kubectl get pods -w
```

A replacement Pod, `nginx-deployment-6cfcb5c844-pzpnf`, was created and reached the `Running` state.

### What happened?

The Deployment's ReplicaSet continuously works to maintain the desired replica count. When the Pod was deleted, the ReplicaSet detected that only two replicas remained and created a replacement.

### Self-Healing Flow

```text
Deployment
    |
    v
ReplicaSet expects 3 Pods
    |
    v
One Pod is deleted
    |
    v
ReplicaSet detects the difference
    |
    v
Replacement Pod is created
    |
    v
3 Pods Running
```

This demonstrated Kubernetes reconciliation and replica management.

---

## 3. Inspected Kubernetes Events

Inspected the Deployment:

```bash
kubectl describe deployment nginx-deployment
```

Reviewed cluster events:

```bash
kubectl get events --sort-by='.lastTimestamp'
```

Observed events included:

- `Scheduled`
- `SuccessfulCreate`
- `Pulled`
- `Created`
- `Started`
- `Killing`

The `SuccessfulCreate` event confirmed that the ReplicaSet created the replacement Pod.

The event output also showed that the Kubernetes node had rebooted and that existing Pod sandboxes were recreated. This helped distinguish node/runtime-related restarts from the deliberate Pod deletion.

---

## 4. Simulated an Image-Pull Failure

Created a temporary test Pod using an invalid image tag.

```bash
kubectl run troubleshooting-demo \
  --image=nginx:nonexistent-tag \
  --restart=Never
```

Inspected the Pod:

```bash
kubectl describe pod troubleshooting-demo
```

### Observed Events

```text
Scheduled
Pulling
Failed
ErrImagePull
BackOff
ImagePullBackOff
```

### Root Cause

The image reference `nginx:nonexistent-tag` did not exist in the Docker Hub Nginx repository.

Kubernetes successfully scheduled the Pod, but the container image could not be pulled.

### Understanding the Error States

| Status | Meaning |
|---|---|
| `Scheduled` | The Pod was assigned to a node. |
| `Pulling` | Kubernetes attempted to download the image. |
| `ErrImagePull` | The image pull failed. |
| `ImagePullBackOff` | Kubernetes delayed the next image-pull attempt. |

### Troubleshooting Approach

For image-pull failures, investigate:

1. Image repository name.
2. Image tag or version.
3. Registry authentication, if required.
4. Network access to the registry.
5. Kubernetes event messages.

---

## 5. Cleaned Up the Test Pod

Deleted the temporary troubleshooting Pod.

```bash
kubectl delete pod troubleshooting-demo
```

Verified the application afterward:

```bash
kubectl get deployments
kubectl get pods
```

The test Pod was removed successfully, and the actual Nginx Deployment remained healthy.

### Final Observed State

- Desired replicas: **3**
- Available replicas: **3**
- Nginx Pods: **3**
- Pod status: `Running`
- Temporary troubleshooting Pod: Deleted

---

## 6. Key Learnings

- Kubernetes continuously reconciles the current state with the desired state.
- ReplicaSets maintain the desired number of Pod replicas.
- Deleting a Deployment-managed Pod results in a replacement being created.
- `kubectl describe` helps investigate resource configuration and events.
- Kubernetes events provide useful information for troubleshooting.
- `ErrImagePull` indicates an image-pull failure.
- `ImagePullBackOff` indicates a retry delay after a failed image pull.
- Temporary troubleshooting resources should be cleaned up after testing.
- Final verification helps ensure the real application remains healthy.

---

## 7. Commands Practiced

```bash
kubectl get deployments
kubectl get pods
kubectl get pods -w
kubectl delete pod <pod-name>
kubectl describe deployment nginx-deployment
kubectl get events --sort-by='.lastTimestamp'
kubectl run troubleshooting-demo \
  --image=nginx:nonexistent-tag \
  --restart=Never
kubectl describe pod troubleshooting-demo
kubectl delete pod troubleshooting-demo
```

---

## 🏁 Day 3 Summary

**Status: COMPLETED**

Successfully demonstrated Kubernetes self-healing, verified ReplicaSet reconciliation, investigated Kubernetes events, reproduced and diagnosed an image-pull failure, cleaned up the temporary test Pod, and confirmed that all three Nginx replicas remained healthy.

### Next Steps

- Explore application health checks using liveness and readiness probes.
- Learn how Kubernetes handles unhealthy containers.
- Continue improving the Kubernetes deployment project.
