# Week 4 — Day 7: Kubernetes Weekly Review

## Objective

Review the Kubernetes concepts and practical tasks completed during Week 4. Validate the Nginx application, inspect cluster resources, and investigate recent container restarts.

## Environment

- Kubernetes cluster: Docker Desktop Kubernetes
- Kubernetes version: v1.34.3
- Project directory: `~/Week4/kubernetes-project`
- Application: Nginx
- Deployment: `nginx-deployment`
- Service: `nginx-service`

## 1. Cluster Resource Audit

Commands used:

```bash
kubectl get deployments -A
kubectl get pods -A
kubectl get services -A
kubectl get configmaps -n default
kubectl get secrets -n default
kubectl get namespaces
```

### Observed Results

- Nginx Deployment had three available replicas.
- The Nginx NodePort Service existed on port 30080.
- The `app-config` ConfigMap contained three entries.
- The `app-secret` Secret contained two data entries.
- The `dev` namespace existed and was Active.
- Kubernetes system components were running.

## 2. Application and Service Validation

Started port forwarding:

```bash
kubectl port-forward service/nginx-service 8080:80
```

Tested the application from another terminal:

```bash
curl -I http://localhost:8080
```

Observed response:

```text
HTTP/1.1 200 OK
Server: nginx/1.30.5
Content-Type: text/html
```

**Result:** The Nginx application responded successfully through the Kubernetes Service.

## 3. Health Probe Review

Inspected the Deployment:

```bash
kubectl describe deployment nginx-deployment
```

The Deployment was configured with HTTP liveness and readiness probes on port 80.

The liveness probe checks container health. The readiness probe determines whether a Pod is ready to receive traffic.

## 4. Restart Investigation

Inspected the Pod and cluster events:

```bash
kubectl describe pod nginx-deployment-57994c4c64-8wd5t

kubectl get events -A --sort-by='.lastTimestamp'
```

### Observed Events

- The node reported a reboot.
- Several Pods reported `SandboxChanged`.
- Kubernetes recreated containers.
- Some CoreDNS readiness checks failed temporarily during recovery.
- The local-path-provisioner reported a `BackOff` event.

These events indicated that the cluster experienced a restart or connectivity interruption.

## 5. Provisioner Troubleshooting

Checked the provisioner:

```bash
kubectl get pods -n local-path-storage
```

Inspected its previous container logs:

```bash
kubectl logs -n local-path-storage \
  local-path-provisioner-5c4cdb564f-lml6d \
  --previous
```

The previous logs reported a timeout while connecting to the Kubernetes API at `10.96.0.1:443` and an error retrieving the `local-path-config` ConfigMap.

Verified the current configuration:

```bash
kubectl get configmap local-path-config \
  -n local-path-storage -o yaml
```

Checked API connectivity:

```bash
kubectl cluster-info
```

Inspected current provisioner logs:

```bash
kubectl logs -n local-path-storage \
  local-path-provisioner-5c4cdb564f-lml6d
```

The current logs showed that the configuration was applied and the provisioner started successfully.

**Conclusion:** The provisioner recovered. The exact underlying cause of the earlier timeout was not conclusively established.

## 6. Final Cluster Verification

```bash
kubectl get nodes
kubectl get pods -A
kubectl get deployment nginx-deployment
```

### Final Observations

- The `desktop-control-plane` node was Ready.
- All Pods showed `Running` and `1/1` ready in the final output.
- The Nginx Deployment remained available with three replicas.
- The local-path-provisioner was running.
- Previous container restart counts remained recorded in Kubernetes.

## 7. Week 4 Key Learnings

1. Deployments maintain the desired number of application replicas.
2. Services provide stable access to Pods.
3. Liveness probes help Kubernetes detect containers that need restarting.
4. Readiness probes control whether Pods receive Service traffic.
5. ConfigMaps manage non-sensitive configuration.
6. Secrets store sensitive configuration but require additional security controls.
7. Namespaces organize resources within a cluster.
8. `kubectl describe`, `kubectl logs`, and Kubernetes Events help troubleshoot failures.
9. Node or runtime interruptions can cause Pod sandbox recreation and container restarts.

## Conclusion

Completed the Week 4 Kubernetes practical review. Verified the Nginx application through its Service, reviewed health probes and configuration resources, practiced namespaces, and investigated cluster restart events.

**Status:** Final review completed. The cluster was operational during the final verification.
