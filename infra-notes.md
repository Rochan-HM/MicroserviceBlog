# Kubernetes
**TODO:** `kubectl` alias in fish config. 

## Services
1. **Cluster IP** - Friendly URL for pod. Exposes pods in cluster.
2. **Node Port** - Make pod accessible from outside cluster (Dev Env).
3. **Load Balancer** - Make pod accessible from outside cluster (prod). Lot more config
4. **External Name** - Redirect in cluster req to CNAME URL



## Commands
1. Get Pods - `k get pods`
2. Update Deployment - `k rollout restart deployment depl_name`
3. Description - `k describe service depl_name`
4. To Create a Secret - `k create secret generic NAME --from-literal=key=value`


# NPM Registry
Self hosted - Verdaccio
`docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio`