# Week 5 — Day 5: Helm Repositories and Chart Management

## Objective

Understand Helm chart repositories and learn how to add repositories, search for charts, inspect chart information and install applications using Helm.

## 1. What Is a Helm Repository?

A Helm repository is a location where Helm charts are stored and distributed. Repositories allow developers to discover and install reusable Kubernetes application packages.

Helm charts can also be stored in OCI-compatible container registries.

### Benefits of Helm Repositories

- Reuse existing Kubernetes application charts.
- Simplify application installation.
- Discover charts maintained by other projects.
- Manage application versions.
- Reduce repetitive Kubernetes YAML configuration.

## 2. Important Helm Commands

| Command | Purpose |
|---|---|
| `helm repo add` | Add a chart repository |
| `helm repo list` | List configured repositories |
| `helm repo update` | Refresh repository information |
| `helm search repo` | Search charts in configured repositories |
| `helm show chart` | Display chart metadata |
| `helm show values` | Display default chart values |
| `helm pull` | Download a chart locally |
| `helm install` | Install a chart |
| `helm uninstall` | Remove a release |

## 3. Add a Helm Repository

For practice use the Bitnami chart repository:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Refresh repository metadata:

```bash
helm repo update
```

List the configured repositories:

```bash
helm repo list
```

**Note:** Repository availability and chart distribution can change. If the repository command fails, check the repository's current official documentation before proceeding.

## 4. Search for Charts

Search for Nginx charts:

```bash
helm search repo nginx
```

Search for a specific chart:

```bash
helm search repo bitnami/nginx
```

Display additional chart versions:

```bash
helm search repo nginx --versions
```

The available charts and versions depend on the repository metadata and its current contents.

## 5. Inspect a Chart

Display chart metadata:

```bash
helm show chart bitnami/nginx
```

Display its default configuration:

```bash
helm show values bitnami/nginx
```

Display the chart's README and metadata:

```bash
helm show readme bitnami/nginx
```

Review the chart's documentation and resource requirements before installing it.

## 6. Download a Chart Without Installing It

Download a chart archive:

```bash
helm pull bitnami/nginx
```

This normally creates a versioned `.tgz` archive in the current directory.

List the downloaded files:

```bash
ls -lh
```

To download and extract a chart:

```bash
helm pull bitnami/nginx --untar
```

Inspect the extracted files:

```bash
find nginx -maxdepth 2 -type f
```

## 7. Validate a Downloaded Chart

If the chart was extracted into the `nginx` directory:

```bash
helm lint nginx
```

Render the manifests locally:

```bash
helm template nginx-demo ./nginx
```

These commands validate and render the chart without installing it into Kubernetes.

## 8. Install a Chart from a Repository

Before installing a chart, verify the Kubernetes cluster:

```bash
kubectl get nodes
```

Create a separate practice namespace:

```bash
kubectl create namespace repo-demo
```

Install the chart:

```bash
helm install repo-nginx bitnami/nginx -n repo-demo
```

**Important:** Chart defaults and resource requirements vary. If installation fails because of missing images, repository changes or resource constraints, inspect the chart documentation and error output instead of repeatedly reinstalling it.

Verify the release:

```bash
helm list -n repo-demo
kubectl get pods,services -n repo-demo
```

Inspect the release status:

```bash
helm status repo-nginx -n repo-demo
```

## 9. Upgrade and Uninstall

Upgrade a release using the selected chart:

```bash
helm upgrade repo-nginx bitnami/nginx -n repo-demo
```

Check the release history:

```bash
helm history repo-nginx -n repo-demo
```

When you have finished the practice exercise, remove the release:

```bash
helm uninstall repo-nginx -n repo-demo
```

If you no longer need the practice namespace:

```bash
kubectl delete namespace repo-demo
```

Only run cleanup commands for resources created specifically for this exercise.

## 10. Helm Repositories and OCI Registries

Helm supports charts distributed through traditional chart repositories and OCI-compatible registries.

Traditional repositories are commonly accessed using commands such as:

```bash
helm repo add
helm repo update
helm search repo
```

OCI charts can be installed from a registry using an OCI reference:

```bash
helm install my-release oci://registry.example.com/charts/my-chart
```

The registry address and chart reference above are examples and must be replaced with a real chart location.

## 11. Day 5 Practical Tasks

- [ ] Add a Helm chart repository.
- [ ] Update repository metadata.
- [ ] List configured repositories.
- [ ] Search for charts.
- [ ] Inspect chart metadata and default values.
- [ ] Download a chart archive.
- [ ] Validate and render a chart locally.
- [ ] Install a chart in a dedicated namespace if the repository and chart are available.
- [ ] Verify the Helm release and Kubernetes resources.
- [ ] Document commands, outputs and troubleshooting.

## 12. Interview Questions

**1. What is a Helm repository?**

A location used to distribute and discover Helm charts.

**2. What does `helm repo update` do?**

It refreshes the local metadata for configured chart repositories.

**3. What is the difference between `helm pull` and `helm install`?**

`helm pull` downloads a chart. `helm install` creates a release in Kubernetes.

**4. What does `helm show values` do?**

It displays the default configuration values defined by a chart.

**5. Can Helm use OCI registries?**

Yes. Helm supports storing and distributing charts through OCI-compatible registries.

**6. Why inspect a chart before installation?**

To understand its default values, requirements and generated resources before deploying it.

## Outcome

After completing these exercises, I should be able to configure Helm repositories, discover charts, inspect chart metadata, download packages and install reusable Kubernetes applications.

## References

- Helm Documentation: https://helm.sh/docs/
- Helm Commands: https://helm.sh/docs/helm/
- Helm Charts: https://helm.sh/docs/topics/charts/
- Helm OCI Registries: https://helm.sh/docs/topics/registries/

---

**Program:** DevOps Engineering Self-Learning Internship  
**Organization:** InternCareerPath  
**Week:** 5  
**Day:** 5
