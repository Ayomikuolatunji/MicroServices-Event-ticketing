## Learning Materials

### Setting Ingress Host Name
- sudo code /etc/hosts

### Set Kubernetes Ingress Load Balancer
- https://github.com/kubernetes/ingress-nginx

### Creating Secret Needed In Each Micro-Service
```
kubectl create secret generic jwt-secret --from-literal=jwt=asdf
```