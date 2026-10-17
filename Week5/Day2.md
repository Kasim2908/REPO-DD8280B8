# Week 5 — Day 2: Helm Chart Deployment

## Objective

Deploy an Nginx application on Kubernetes using Helm and verify the release, application accessibility and chart test.

## Tasks Completed

- Installed and verified Helm v3.22.1.
- Created a Helm chart using `helm create nginx-chart`.
- Validated the chart using `helm lint`.
- Rendered Kubernetes manifests using `helm template`.
- Updated the container image to `nginx:stable`.
- Created the `helm-demo` namespace.
- Installed the chart as the `nginx-demo` release.
- Verified the Deployment, Pod and ClusterIP Service.
- Tested the application using port forwarding.
- Received an HTTP `200 OK` response.
- Executed the Helm connection test successfully.

## Commands Used

```bash
helm version
helm create nginx-chart
helm lint .
helm template nginx-demo .
kubectl create namespace helm-demo
helm install nginx-demo . -n helm-demo
helm list -n helm-demo
kubectl get deployments,pods,services -n helm-demo
kubectl rollout status deployment/nginx-demo-nginx-chart -n helm-demo --timeout=120s
kubectl port-forward service/nginx-demo-nginx-chart 8080:80 -n helm-demo
curl -I http://localhost:8080
helm test nginx-demo -n helm-demo
```

## Validation Results

| Check | Result |
|---|---|
| Helm chart linting | Passed |
| Manifest rendering | Successful |
| Helm release | Deployed |
| Deployment availability | 1/1 |
| Pod status | Running |
| Application HTTP response | 200 OK |
| Helm connection test | Succeeded |

## Key Learnings

- Helm charts package Kubernetes resource templates.
- `values.yaml` allows application configuration to be customized.
- `helm lint` checks a chart for common issues.
- `helm template` renders manifests without deploying them.
- `helm install` creates a Helm release.
- `helm list` displays installed releases.
- `helm test` executes chart-defined tests.
- Port forwarding provides temporary local access to a Kubernetes Service.

## Outcome

Successfully deployed an Nginx application using Helm and verified that the Kubernetes resources were healthy and the application responded with HTTP 200 OK.

## Next Steps

Practice Helm upgrades, release history and rollbacks.

---

**Program:** DevOps Engineering Self-Learning Internship  
**Organization:** InternCareerPath  
**Week:** 5  
**Day:** 2
