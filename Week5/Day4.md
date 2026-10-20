# Week 5 — Day 4: Helm Values and Configuration Management

## Objective

Understand how Helm values customize Kubernetes resources and learn how to manage different configurations without repeatedly editing chart templates.

## 1. What Are Helm Values?

Helm values are configuration parameters used by chart templates to generate Kubernetes manifests.

Instead of hardcoding every setting in a template, you define configurable values in `values.yaml`.

For example:

```yaml
replicaCount: 2

image:
  repository: nginx
  tag: stable
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
```

These values can control the number of replicas, container image and Service configuration.

## 2. Understanding values.yaml

Your existing chart is located at:

```text
~/Week5/Day2/nginx-chart/
```

Navigate to the chart:

```bash
cd ~/Week5/Day2/nginx-chart
```

Inspect the configuration:

```bash
cat values.yaml
```

Important settings include:

| Value | Purpose |
|---|---|
| `replicaCount` | Number of application replicas |
| `image.repository` | Container image repository |
| `image.tag` | Container image tag |
| `image.pullPolicy` | Image pull behavior |
| `service.type` | Kubernetes Service type |
| `service.port` | Service port |

The available values depend on the chart's templates.

## 3. Override Values with --set

You can override a value directly from the command line.

For example:

```bash
helm upgrade nginx-demo . \
  -n helm-demo \
  --set replicaCount=2
```

Verify the Deployment:

```bash
kubectl get deployment nginx-demo-nginx-chart -n helm-demo
kubectl get pods -n helm-demo
```

Expected result: the Deployment targets two replicas.

Inspect the release values:

```bash
helm get values nginx-demo -n helm-demo
```

To display the chart defaults together with computed values:

```bash
helm get values nginx-demo -n helm-demo --all
```

## 4. Override Values Using a Separate File

For larger configurations it is easier to use a separate values file instead of multiple `--set` arguments.

Create a development configuration:

```bash
nano values-dev.yaml
```

Add:

```yaml
replicaCount: 1

image:
  repository: nginx
  tag: stable
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
```

Save the file.

Upgrade the release using the new file:

```bash
helm upgrade nginx-demo . \
  -n helm-demo \
  -f values-dev.yaml
```

Verify:

```bash
helm get values nginx-demo -n helm-demo
kubectl get deployments,pods,services -n helm-demo
```

## 5. Development and Production Configurations

Different environments often require different resource settings.

For example:

**values-dev.yaml**

```yaml
replicaCount: 1
```

**values-prod.yaml**

```yaml
replicaCount: 3
```

Deploy using the selected configuration file:

```bash
helm upgrade --install nginx-demo . \
  -n helm-demo \
  -f values-dev.yaml
```

For production settings:

```bash
helm upgrade --install nginx-demo . \
  -n helm-demo \
  -f values-prod.yaml
```

These commands target the same Helm release. Use them only when you intend to change that release's configuration.

## 6. Preview Changes Before Applying Them

Render the chart without deploying it:

```bash
helm template nginx-demo . \
  -f values-dev.yaml \
  -n helm-demo
```

Check the chart for common issues:

```bash
helm lint .
```

This helps you inspect the generated manifests before modifying the running application.

## 7. Helm Values Precedence

Helm supports multiple ways to supply configuration.

A simplified order from lower to higher precedence is:

1. Chart defaults in `values.yaml`.
2. Values supplied using `-f`.
3. Values supplied using `--set`.

When multiple values files are supplied, later files override conflicting values from earlier files.

Example:

```bash
helm upgrade nginx-demo . \
  -n helm-demo \
  -f values-dev.yaml \
  --set replicaCount=2
```

In this example, the command-line setting overrides `replicaCount` from the values file.

## 8. Important Security Practice

Do not store real passwords, API keys or database credentials in public Helm values files.

Use Kubernetes Secrets or an appropriate external secrets-management solution for sensitive configuration. Remember that Kubernetes Secrets require proper access controls and are not automatically encrypted in every cluster configuration.

## 9. Day 4 Practical Tasks

- [ ] Inspect the chart's existing `values.yaml`.
- [ ] Upgrade the release using `--set replicaCount=2`.
- [ ] Verify the number of running replicas.
- [ ] Create a separate `values-dev.yaml`.
- [ ] Apply the development values file.
- [ ] Create a `values-prod.yaml` with three replicas.
- [ ] Preview the manifests with `helm template`.
- [ ] Inspect the applied release values.
- [ ] Document the command outputs and results.

## 10. Interview Questions

**1. What is values.yaml?**

It defines the default configuration values used by Helm chart templates.

**2. What is the difference between values.yaml and templates?**

`values.yaml` contains configuration data while templates use that data to generate Kubernetes resource definitions.

**3. What does --set do?**

It overrides chart values directly from the command line.

**4. Why use separate values files?**

They allow different configurations for development, testing and production without duplicating the entire chart.

**5. What does helm template do?**

It renders Kubernetes manifests locally without installing the release.

**6. How can you inspect the values used by a release?**

Use `helm get values RELEASE_NAME -n NAMESPACE`.

## Outcome

After completing these exercises, I should be able to customize Helm charts, override configuration values, manage environment-specific settings and preview rendered Kubernetes manifests before applying changes.

## References

- Helm Documentation: https://helm.sh/docs/
- Helm Values: https://helm.sh/docs/chart_template_guide/values_files/
- Helm Upgrade: https://helm.sh/docs/helm/helm_upgrade/
