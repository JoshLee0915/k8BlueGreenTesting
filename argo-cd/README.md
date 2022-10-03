# argo-cd

K8 deployment for Argo CD
https://argo-cd.readthedocs.io/en/stable/


## Install
Run `kubectl apply -k {env dir}` to install on the cluster

## Get admin password
Run `kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"` to get the default admin password. Note that the result is in base64 and will have to be decoded to be used. This can be done with `base64 -d` on linux systems but windows systems do not have a built in base64 function atm and will require an external tool or custom powershell script.