# Week 5 — Day 6: Helm Chart Customization and Environment-Based Deployments

## Objective

Learn how to customize Helm charts using values files and deploy applications with different configurations for development and production environments.

## 1. What Is Helm Chart Customization?

Helm chart customization allows us to change application settings without manually editing every Kubernetes resource template.

For example, we can customize:

- Number of replicas
- Container image and tag
- Service type and port
- Resource requests and limits
- Environment-specific configuration

The chart's `values.yaml` file provides default values. Additional values files or command-line overrides can customize those defaults.

## 2. Review the Existing Chart

Navigate to your Nginx chart:

```bash
cd ~/Week5/Day2/nginx-chart
```

Check the chart structure:

```bash
ls
cat Chart.yaml
cat values.yaml
```

Validate the chart:

```bash
helm lint .
```

Render the manifests:

```bash
helm template nginx-demo .
```

## 3. Create Development Configuration

Create a development values file:

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

Validate the configuration by rendering the chart:

```bash
helm template nginx-demo . -f values-dev.yaml
```

## 4. Create Production Configuration

Create another values file:

```bash
nano values-prod.yaml
```

Add:

```yaml
replicaCount: 3

image:
  repository: nginx
  tag: stable
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
```

Render the production configuration:

```bash
helm template nginx-demo . -f values-prod.yaml
```

Inspect the generated Deployment and verify that it specifies three replicas.

## 5. Deploy the Development Configuration

First verify your Kubernetes cluster:

```bash
kubectl get nodes
```

Create a development namespace:

```bash
kubectl create namespace helm-dev
```

Install the chart:

```bash
helm upgrade --install nginx-dev . \
  -n helm-dev \
  -f values-dev.yaml
```

Verify the resources:

```bash
helm list -n helm-dev
kubectl get deployments,pods,services -n helm-dev
```

Expected result: the Deployment targets one replica.

## 6. Deploy the Production Configuration

Create a separate namespace:

```bash
kubectl create namespace helm-prod
```

Install the chart with production values:

```bash
helm upgrade --install nginx-prod . \
  -n helm-prod \
  -f values-prod.yaml
```

Verify the resources:

```bash
helm list -n helm-prod
kubectl get deployments,pods,services -n helm-prod
```

Expected result: the Deployment targets three replicas.

**Note:** This is a learning simulation of environment-specific configurations. A real production deployment also requires suitable resource limits, security settings, monitoring, availability planning and an appropriate image version strategy.

## 7. Compare the Environments

Check the Deployment replica counts:

```bash
kubectl get deployments -n helm-dev
kubectl get deployments -n helm-prod
```

Compare the Pods:

```bash
kubectl get pods -n helm-dev
kubectl get pods -n helm-prod
```

Inspect Helm releases:

```bash
helm list -A
```

Development should target one replica while production should target three.

## 8. Upgrade a Configuration

Change the development replica count in `values-dev.yaml` from one to two:

```yaml
replicaCount: 2
```

Apply the updated configuration:

```bash
helm upgrade nginx-dev . \
  -n helm-dev \
  -f values-dev.yaml
```

Verify:

```bash
kubectl get deployment -n helm-dev
kubectl rollout status deployment/nginx-dev-nginx-chart -n helm-dev --timeout=120s
```

The Deployment should eventually report two available replicas.

## 9. Preview Changes Before Deployment

Use Helm template rendering to inspect manifests before applying changes:

```bash
helm template nginx-dev . \
  -n helm-dev \
  -f values-dev.yaml
```

Validate the chart:

```bash
helm lint .
```

These commands help detect configuration issues before a release is installed or upgraded.

## 10. Security Best Practices

- Never commit real passwords or API keys to GitHub.
- Use Kubernetes Secrets or an appropriate external secrets-management solution.
- Avoid using mutable image tags in production when reproducible deployments are important.
- Configure resource requests and limits for application containers.
- Review generated Kubernetes manifests before deploying them.
- Use separate namespaces and appropriate access controls for environments.

## 11. Day 6 Tasks

- [ ] Review the existing Helm chart.
- [ ] Create `values-dev.yaml`.
- [ ] Create `values-prod.yaml`.
- [ ] Render both configurations using `helm template`.
- [ ] Deploy development configuration.
- [ ] Deploy production configuration.
- [ ] Verify replica counts in both namespaces.
- [ ] Upgrade the development release.
- [ ] Record command outputs and results.
- [ ] Capture screenshots for project documentation.

## 12. Interview Questions

**1. Why use separate values files?**

They allow different configurations for development, testing and production without maintaining separate copies of the chart.

**2. What is the difference between `helm install` and `helm upgrade --install`?**

`helm install` creates a new release. `helm upgrade --install` upgrades an existing release or installs it if it does not exist.

**3. Why use separate namespaces?**

Namespaces organize resources and provide a scope for resource names and access controls. They are not, by themselves, a complete security boundary.

**4. How can you preview chart output?**

Use `helm template` with the desired values file.

**5. What is configuration drift?**

Configuration drift occurs when the actual state of a system differs from its intended or declared configuration.

## Outcome

After completing these exercises, I should be able to customize Helm charts and deploy the same application with different configurations in separate Kubernetes namespaces.

## References

- Helm Documentation: https://helm.sh/docs/
- Helm Values: https://helm.sh/docs/chart_template_guide/values_files/
- Helm Upgrade: https://helm.sh/docs/helm/helm_upgrade/
- Kubernetes Namespaces: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

---

**Program:** DevOps Engineering Self-Learning Internship  
**Organization:** InternCareerPath  
**Week:** 5  
**Day:** 6
