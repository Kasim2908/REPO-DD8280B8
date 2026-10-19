# Week 5 — Day 3: Helm Upgrades and Rollbacks

## Objective

Learn how to update a Helm release and roll it back to a previous revision when needed.

## 1. What Is a Helm Upgrade?

A Helm upgrade updates an existing release using a chart and its configuration values.

Common reasons to upgrade include:
- Changing the container image.
- Increasing or decreasing replica counts.
- Updating Service configuration.
- Applying new application settings.

Command:

```bash
helm upgrade nginx-demo . -n helm-demo
```

Run this command from the directory containing your `Chart.yaml`.

## 2. Check the Existing Release

First verify that your Kubernetes cluster is accessible.

```bash
kubectl get nodes
helm list -n helm-demo
helm history nginx-demo -n helm-demo
kubectl get deployments,pods,services -n helm-demo
```

Your previous release was named `nginx-demo` in the `helm-demo` namespace.

## 3. Update the Replica Count

Open the chart's values file:

```bash
cd ~/Week5/Day2/nginx-chart
nano values.yaml
```

Change:

```yaml
replicaCount: 1
```

to:

```yaml
replicaCount: 2
```

Save the file.

## 4. Apply the Upgrade

Run:

```bash
helm upgrade nginx-demo . -n helm-demo
```

Check the release:

```bash
helm list -n helm-demo
helm history nginx-demo -n helm-demo
kubectl get deployments,pods -n helm-demo
```

Expected result: the release revision increases and the Deployment should target two replicas.

Verify rollout status:

```bash
kubectl rollout status deployment/nginx-demo-nginx-chart -n helm-demo --timeout=120s
```

## 5. Understand Helm Release History

Helm maintains revisions for release changes.

Use:

```bash
helm history nginx-demo -n helm-demo
```

The output includes the revision number, update date, status and description.

A successful upgrade normally creates a new revision.

## 6. Roll Back to a Previous Revision

If an upgrade causes problems, you can restore an earlier release revision.

First inspect the history:

```bash
helm history nginx-demo -n helm-demo
```

Then roll back to the earlier revision:

```bash
helm rollback nginx-demo 1 -n helm-demo
```

Use revision `1` only if it is the earlier revision you intend to restore.

Verify:

```bash
helm history nginx-demo -n helm-demo
kubectl get deployments,pods -n helm-demo
kubectl rollout status deployment/nginx-demo-nginx-chart -n helm-demo --timeout=120s
```

If revision 1 had one replica, the rollback should restore that configuration.

## 7. Upgrade with a Command-Line Value

You can override a chart value without editing `values.yaml`.

For example:

```bash
helm upgrade nginx-demo . -n helm-demo --set replicaCount=3
```

Verify:

```bash
kubectl get deployment nginx-demo-nginx-chart -n helm-demo
```

The Deployment should target three replicas after the upgrade completes.

**Note:** A later upgrade that uses the chart's default values can reset this command-line override unless you preserve it with an appropriate values strategy.

## 8. Useful Helm Commands

| Command | Purpose |
|---|---|
| `helm list -n helm-demo` | List releases |
| `helm status nginx-demo -n helm-demo` | Show release status |
| `helm history nginx-demo -n helm-demo` | Display revisions |
| `helm upgrade nginx-demo . -n helm-demo` | Upgrade a release |
| `helm rollback nginx-demo 1 -n helm-demo` | Roll back to revision 1 |
| `helm get values nginx-demo -n helm-demo` | Show user-supplied values |
| `helm get manifest nginx-demo -n helm-demo` | Display rendered resources |

## 9. Day 3 Tasks

- [ ] Inspect the existing Helm release.
- [ ] Check release history.
- [ ] Increase the replica count to two.
- [ ] Upgrade the release.
- [ ] Verify the updated Deployment and Pods.
- [ ] Roll back to a previous revision.
- [ ] Verify the restored configuration.
- [ ] Record command outputs and troubleshooting notes.

## 10. Interview Questions

**1. What does `helm upgrade` do?**

It updates an existing Helm release using a chart and configuration values.

**2. What is a Helm revision?**

A revision represents a version of a Helm release as it changes over time.

**3. Why is rollback useful?**

It allows you to restore a previous release revision when a newer deployment has problems.

**4. How do you inspect Helm history?**

Use `helm history RELEASE_NAME -n NAMESPACE`.

**5. What is the purpose of `--set`?**

It overrides chart values directly from the command line.

## Outcome

After completing these exercises, I should be able to update a Helm release, inspect its history and restore a previous revision.

## References

- Helm Documentation: https://helm.sh/docs/
- Helm Upgrade: https://helm.sh/docs/helm/helm_upgrade/
- Helm Rollback: https://helm.sh/docs/helm/helm_rollback/
