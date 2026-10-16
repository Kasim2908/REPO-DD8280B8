# Week 5 — Day 1: Introduction to Helm

## Objective

Understand Helm and learn how to use it to package and manage applications deployed on Kubernetes.

## 1. What is Helm?

Helm is a package manager for Kubernetes. It helps you install and manage Kubernetes applications using reusable packages called **Charts**.

Without Helm you may need to maintain multiple YAML files manually. Helm lets you organize these files into a reusable chart and customize values for different environments.

### Why do we use Helm?

- Simplifies Kubernetes application deployment.
- Reduces repetitive YAML configuration.
- Supports reusable templates.
- Makes upgrades and rollbacks easier.
- Helps manage application releases.
- Supports different configurations for development and production.

## 2. Important Helm Concepts

| Concept | Description |
|---|---|
| Chart | A package containing Kubernetes resource templates and configuration |
| Release | An installed instance of a Helm chart |
| Repository | A location where charts are stored and shared |
| Values | Configuration used to customize a chart |
| Templates | Files that generate Kubernetes YAML resources |
| `values.yaml` | Default configuration values for a chart |
| `Chart.yaml` | Metadata about the chart |

## 3. How Helm Works

```text
Developer
    |
    v
Helm Chart
    |
    v
values.yaml + Templates
    |
    v
Helm Renders Kubernetes YAML
    |
    v
Kubernetes API Server
    |
    v
Deployments / Services / Pods
```

Helm renders chart templates using the supplied values and manages the resulting Kubernetes resources as a release.

## 4. Install and Verify Helm

On Ubuntu or WSL Ubuntu you can install Helm using the official installation script:

```bash
curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Verify the installation:

```bash
helm version
```

Check that your Kubernetes cluster is accessible:

```bash
kubectl get nodes
helm list -A
```

**Note:** The installation script downloads and executes code. Review the official Helm installation instructions if you prefer to inspect the script before running it.

Official documentation: https://helm.sh/docs/intro/install/

## 5. Create Your First Helm Chart

Create a separate practice directory:

```bash
mkdir -p ~/Week5/Day1
cd ~/Week5/Day1
```

Generate a sample chart:

```bash
helm create nginx-chart
```

Inspect the chart:

```bash
tree nginx-chart
```

If `tree` is not installed:

```bash
find nginx-chart -maxdepth 3 -type f
```

A generated chart generally contains:

```text
nginx-chart/
├── Chart.yaml
├── values.yaml
├── charts/
├── templates/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── hpa.yaml
│   ├── serviceaccount.yaml
│   └── tests/
└── .helmignore
```

The exact generated files may vary by Helm version.

## 6. Understand Chart.yaml and values.yaml

### Chart.yaml

This file contains chart metadata such as its name and version.

Example:

```yaml
apiVersion: v2
name: nginx-chart
description: A Helm chart for Kubernetes
type: application
version: 0.1.0
appVersion: "1.0.0"
```

- `apiVersion`: Helm chart format version.
- `name`: Chart name.
- `type`: Application chart.
- `version`: Chart package version.
- `appVersion`: Version of the application being packaged.

### values.yaml

This file contains default values used by chart templates.

For example:

```yaml
replicaCount: 1

image:
  repository: nginx
  pullPolicy: IfNotPresent
  tag: "stable"

service:
  type: ClusterIP
  port: 80
```

These values are examples. The generated chart may contain additional settings.

## 7. Validate and Render the Chart

Move into the project directory:

```bash
cd ~/Week5/Day1/nginx-chart
```

Check chart metadata and structure:

```bash
helm lint .
```

Render the Kubernetes manifests locally without installing the application:

```bash
helm template nginx-demo .
```

Review the output and identify the Deployment and Service resources.

## 8. Install the Chart

First verify your current Kubernetes context:

```bash
kubectl config current-context
kubectl get nodes
```

Install the chart in a dedicated practice namespace:

```bash
kubectl create namespace helm-demo
helm install nginx-demo . -n helm-demo
```

Check the release and resources:

```bash
helm list -n helm-demo
kubectl get all -n helm-demo
```

Wait for the Deployment to become ready:

```bash
kubectl rollout status deployment -n helm-demo --timeout=120s
```

If the Deployment name differs from the release name, identify it with `kubectl get deployments -n helm-demo` and use its actual name in the rollout command.

## 9. Upgrade a Release

Change a value in `values.yaml` such as:

```yaml
replicaCount: 2
```

Apply the updated chart:

```bash
helm upgrade nginx-demo . -n helm-demo
```

Verify the change:

```bash
kubectl get deployments -n helm-demo
kubectl get pods -n helm-demo
helm history nginx-demo -n helm-demo
```

## 10. Roll Back a Release

View release history:

```bash
helm history nginx-demo -n helm-demo
```

Roll back to the previous revision:

```bash
helm rollback nginx-demo 1 -n helm-demo
```

Replace `1` with the revision you actually want to restore.

Verify the Deployment after rollback:

```bash
kubectl get deployments -n helm-demo
kubectl rollout status deployment -n helm-demo --timeout=120s
```

## 11. Clean Up

When you have finished testing:

```bash
helm uninstall nginx-demo -n helm-demo
kubectl delete namespace helm-demo
```

This removes the practice release and namespace. Do not run these cleanup commands against a namespace containing workloads you need to keep.

## 12. Day 1 Tasks

- [ ] Understand Helm and its advantages.
- [ ] Learn Charts, Releases, Repositories and Values.
- [ ] Install Helm and verify the version.
- [ ] Generate a chart using `helm create`.
- [ ] Inspect `Chart.yaml` and `values.yaml`.
- [ ] Run `helm lint`.
- [ ] Render manifests using `helm template`.
- [ ] Install a chart in a practice namespace.
- [ ] Inspect the release and Kubernetes resources.
- [ ] Practice an upgrade and rollback.
- [ ] Record commands and results in your GitHub repository.

## 13. Interview Questions

**1. What is Helm?**

Helm is a package manager for Kubernetes that helps package, configure, install and manage applications.

**2. What is a Helm Chart?**

A Helm Chart is a package containing templates, default values and metadata used to deploy an application on Kubernetes.

**3. What is a Helm Release?**

A release is an installed instance of a Helm chart.

**4. What is the purpose of values.yaml?**

It provides default configuration values that can be customized when installing or upgrading a chart.

**5. What is the difference between `helm install` and `helm upgrade`?**

`helm install` creates a new release. `helm upgrade` updates an existing release.

**6. What does `helm rollback` do?**

It restores a release to a selected previous revision.

**7. What is the difference between Helm and kubectl?**

`kubectl` directly manages Kubernetes resources. Helm manages chart-based releases and renders templates into Kubernetes resources.

## Day 1 Outcome

By completing this exercise I should be able to explain Helm fundamentals, create and inspect a chart, render Kubernetes manifests, install a release and practice upgrades and rollbacks.

## References

- Helm Documentation: https://helm.sh/docs/
- Helm Installation: https://helm.sh/docs/intro/install/
- Helm Quickstart: https://helm.sh/docs/intro/quickstart/
- Helm Chart Guide: https://helm.sh/docs/topics/charts/
