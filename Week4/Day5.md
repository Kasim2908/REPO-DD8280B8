# Week 4 — Day 5: Kubernetes ConfigMaps and Secrets

## Objective

Learn to manage application configuration using Kubernetes ConfigMaps and Secrets, inject their values into Pods as environment variables, and troubleshoot missing configuration resources.

## Environment

- Kubernetes cluster: Docker Desktop Kubernetes
- Project directory: `~/Week4/kubernetes-project`
- Namespace: `default`
- Existing application: Nginx Deployment with 3 replicas

## 1. ConfigMaps

A ConfigMap stores non-sensitive configuration separately from an application's container image.

Created `app-config.yaml`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_NAME: "Kubernetes Demo"
  APP_ENV: "development"
  APP_VERSION: "1.0"
```

Applied and inspected the resource:

```bash
kubectl apply -f app-config.yaml
kubectl get configmaps
kubectl describe configmap app-config
```

**Result:** The `app-config` ConfigMap was created with three data entries.

## 2. Inject ConfigMap Values into a Pod

Created `configmap-pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: configmap-demo
spec:
  containers:
    - name: demo
      image: busybox:1.36
      command: ["sh", "-c", "sleep 3600"]
      envFrom:
        - configMapRef:
            name: app-config
```

Applied the manifest:

```bash
kubectl apply -f configmap-pod.yaml
kubectl get pod configmap-demo
```

Verified the environment variables:

```bash
kubectl exec configmap-demo -- printenv APP_NAME
kubectl exec configmap-demo -- printenv APP_ENV
kubectl exec configmap-demo -- printenv APP_VERSION
```

**Observed output:**

- `APP_NAME`: `Kubernetes Demo`
- `APP_ENV`: `development`
- `APP_VERSION`: `1.0`

**Result:** All three ConfigMap values were available inside the container as environment variables.

## 3. Kubernetes Secrets

A Secret stores sensitive configuration such as credentials and tokens. However, Kubernetes Secrets are not automatically encrypted at rest merely because they are stored as Secret objects.

Created a practice Secret using fake credentials:

```bash
kubectl create secret generic app-secret \
  --from-literal=DB_USERNAME=demo-user \
  --from-literal=DB_PASSWORD=practice-only-123
```

Inspected the resource:

```bash
kubectl get secrets
kubectl describe secret app-secret
```

**Result:** The Secret was created with two data entries.

## 4. Inject Secret Values into a Pod

Created `secret-pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secret-demo
spec:
  containers:
    - name: demo
      image: busybox:1.36
      command: ["sh", "-c", "sleep 3600"]
      envFrom:
        - secretRef:
            name: app-secret
```

Applied the manifest:

```bash
kubectl apply -f secret-pod.yaml
kubectl get pod secret-demo
```

Verified the variables without printing the password:

```bash
kubectl exec secret-demo -- printenv DB_USERNAME

kubectl exec secret-demo -- sh -c \
  'test -n "$DB_PASSWORD" && echo "DB_PASSWORD is set"'
```

**Observed output:**

```text
demo-user
DB_PASSWORD is set
```

**Result:** Both Secret environment variables were available inside the container.

## 5. Troubleshooting: CreateContainerConfigError

The initial `secret-demo` Pod failed with:

```text
CreateContainerConfigError
Error: secret "app-secret" not found
```

The Pod description showed that the container referenced `app-secret`, but Kubernetes could not find that Secret in the `default` namespace.

### Resolution

1. Inspected the Pod using `kubectl describe pod secret-demo`.
2. Identified the missing Secret from the Events section.
3. Created `app-secret` with the practice credentials.
4. Deleted and recreated the failed Pod.
5. Verified that the replacement Pod reached `Running` with `1/1` readiness.
6. Confirmed that the Secret environment variables were available.

**Key learning:** A Pod that references a required Secret cannot start its container if that Secret is missing from the Pod's namespace.

## 6. Cleanup

Deleted the temporary test Pods:

```bash
kubectl delete pod configmap-demo secret-demo
```

The ConfigMap and Secret were retained for further inspection.

## 7. Security Considerations

- Never use real passwords or production credentials in practice commands.
- Avoid committing sensitive values to public Git repositories.
- Restrict Secret access using Kubernetes RBAC.
- Enable encryption at rest for Secrets where appropriate.
- Consider an external secret manager for production environments.

## 8. Key Learnings

1. ConfigMaps separate non-sensitive configuration from application images.
2. Secrets provide a Kubernetes resource for sensitive configuration.
3. `envFrom` injects ConfigMap or Secret entries as container environment variables.
4. Required configuration resources must exist in the Pod's namespace.
5. `kubectl describe pod` and Pod Events are useful for troubleshooting.
6. Secrets require additional security controls; Base64 encoding alone is not encryption.

## Conclusion

Created a ConfigMap and Secret, injected their values into test Pods, verified the resulting environment variables, and resolved a missing-Secret configuration error.

**Status:** Week 4 Day 5 practical completed.
