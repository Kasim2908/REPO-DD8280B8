# Week 4 — Day 6: Kubernetes Namespaces

## Objective

Understand Kubernetes namespaces and use them to organize resources within a cluster.

## Environment

- Kubernetes cluster: Docker Desktop Kubernetes
- Project directory: `~/Week4/kubernetes-project`
- Existing application: `nginx-deployment`
- New practice namespace: `dev`

## 1. Inspect Existing Namespaces

Command:

```bash
kubectl get namespaces
```

Namespaces observed:

- `default`
- `kube-node-lease`
- `kube-public`
- `kube-system`
- `local-path-storage`

The current kubectl context uses the `default` namespace because no explicit namespace was configured.

## 2. Check the Existing Deployment

```bash
kubectl get deployments -n default
kubectl get pods -n default
```

**Observed result:** The existing Nginx Deployment had three available replicas.

## 3. Create a Namespace

```bash
kubectl create namespace dev
kubectl get namespaces
kubectl get pods -n dev
```

**Observed result:** The `dev` namespace was created successfully and initially contained no Pods.

## 4. Deploy Nginx in the New Namespace

Created `dev-pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: dev-nginx
  namespace: dev
spec:
  containers:
    - name: nginx
      image: nginx:stable
      ports:
        - containerPort: 80
```

Applied the manifest:

```bash
kubectl apply -f dev-pod.yaml
kubectl get pods -n dev
```

**Observed result:** The `dev-nginx` Pod reached `Running` with `1/1` readiness and zero restarts.

## 5. Compare Resources Across Namespaces

```bash
kubectl get pods -n default
kubectl get pods -n dev
kubectl get pods -A
```

The commands demonstrated that the original three Nginx Deployment Pods remained in `default`, while the practice Pod existed separately in `dev`.

The `-A` flag lists Pods across all namespaces.

To inspect the practice Pod:

```bash
kubectl describe pod dev-nginx -n dev
```

## 6. Cleanup

After verifying the Pod:

```bash
kubectl delete -f dev-pod.yaml
kubectl get pods -n dev
```

**Expected result:** No Pods remain in `dev`. The namespace itself remains available for future practice.

## 7. Key Learnings

1. Namespaces organize resources within a Kubernetes cluster.
2. Resources can be inspected using `kubectl get` with the `-n` flag.
3. The `-A` flag lists resources across all namespaces.
4. A resource manifest can specify its namespace using `metadata.namespace`.
5. Namespaces do not provide complete security isolation by themselves.
6. Namespace-specific commands help avoid accidentally modifying resources in another namespace.

## Conclusion

Created a dedicated development namespace, deployed a test Nginx Pod into it, verified resources across namespaces, and cleaned up the temporary Pod without modifying the original Deployment.

**Status:** Day 6 namespace exercise completed after cleanup verification.
