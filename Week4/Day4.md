# Week 4 — Day 4: Kubernetes Health Probes

## Objective

Learn how Kubernetes health probes monitor application containers and determine whether a Pod is ready to receive traffic.

## Environment

- Kubernetes cluster: Docker Desktop Kubernetes
- Application: Nginx
- Deployment: `nginx-deployment`
- Service: `nginx-service`
- Namespace: `default`
- Replicas: 3

## 1. Liveness Probe

A liveness probe checks whether a container is still functioning properly.

If the liveness probe repeatedly fails, Kubernetes restarts the affected container.

Configuration used:

```yaml
livenessProbe:
  httpGet:
    path: /
    port: 80
  initialDelaySeconds: 10
  periodSeconds: 10
```

## 2. Readiness Probe

A readiness probe checks whether an application is ready to handle requests.

If readiness fails, Kubernetes marks the Pod as not ready and removes it from the Service's ready endpoints until it becomes ready again.

Configuration used:

```yaml
readinessProbe:
  httpGet:
    path: /
    port: 80
  initialDelaySeconds: 5
  periodSeconds: 5
```

## 3. Updated Deployment Manifest

The `deployment.yaml` file was updated with three replicas and both health probes.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
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
          livenessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 10
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 5
```

## 4. Apply the Configuration

```bash
kubectl apply -f deployment.yaml
kubectl rollout status deployment/nginx-deployment
```

## 5. Verification Commands

Check the Deployment:

```bash
kubectl get deployment nginx-deployment
```

Inspect the probe configuration:

```bash
kubectl describe deployment nginx-deployment
```

Check Pod status:

```bash
kubectl get pods
```

Check Service endpoints:

```bash
kubectl get endpoints nginx-service
```

The `kubectl get endpoints` command displays a deprecation warning on newer Kubernetes versions. The EndpointSlice API is the recommended alternative:

```bash
kubectl get endpointslices \
  -l kubernetes.io/service-name=nginx-service
```

## 6. Test the Application

Start port forwarding:

```bash
kubectl port-forward service/nginx-service 8080:80
```

In another terminal, send an HTTP request:

```bash
curl -I http://localhost:8080
```

A successful response should include `HTTP/1.1 200 OK`.

Record the result of this HTTP test after running it.

## 7. Observed Results

- Deployment reported 3 desired, 3 updated, and 3 available replicas.
- All three Nginx Pods were in the `Running` state and showed `1/1` readiness.
- The liveness and readiness probes appeared in the Deployment description.
- The Service showed three Pod IPs as endpoints.
- The Deployment update created a new ReplicaSet and scaled down the old ReplicaSet.

## 8. Key Learnings

1. Liveness probes help Kubernetes detect containers that need restarting.
2. Readiness probes control whether a Pod is considered ready to receive traffic.
3. A Pod being `Running` does not, by itself, prove that the application is ready.
4. Deployment manifests should match the intended live configuration.
5. Services route traffic to eligible Pod endpoints.
6. `kubectl describe`, `kubectl get pods`, and `kubectl get endpointslices` help troubleshoot Kubernetes applications.

## Conclusion

Configured HTTP liveness and readiness probes for a three-replica Nginx Deployment. Verified the Deployment status, probe configuration, Pod readiness, and Service endpoints.

**Status:** Day 4 configuration and verification completed. HTTP response testing should be recorded after confirming the `curl` result.
