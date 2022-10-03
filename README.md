# k8BlueGreenTesting
Repo for testing K8 Blue Green deployments

# Setting up ingress for docker for desktop K8 cluster
Run `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.3.1/deploy/static/provider/cloud/deploy.yaml` to install the nginx ingress controller. You should then be able to access the ingress on `localhost:80`. Not that you may have to port forward the ingress controller if that does not work.

https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop