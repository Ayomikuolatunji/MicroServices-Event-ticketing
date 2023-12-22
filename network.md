## Learning Materials

### Setting Ingress Host Name

- sudo code /etc/hosts

### Set Kubernetes Ingress Load Balancer

- https://github.com/kubernetes/ingress-nginx

### Creating Secret Needed In Each Micro-Service
```
kubectl create secret generic {{name(jwt-secret)}} --from-literal={{key}}={{value}}
```

### Get Kubectl Secrets 
```
kubectl get secrets
```