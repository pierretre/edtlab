
# Deployment Guide

Flow:

- Push to `main` → `.github/workflows/docker-build-publish.yml` builds `Dockerfile.prod` and pushes `pierretre/edtlab:latest` (+ short SHA) to Docker Hub. No GitHub Release is involved — see [CI/CD Setup](ci-cd-setup.md).
- A webhook on the production server, triggered by Docker Hub, pulls the new image and restarts the container.

## Server

Deployed on the DiverSE team VPS "Atmosphere" (`10.0.0.2`). Connection docs: [miniCloud - GitLab Inria](https://gitlab.inria.fr/diverse/experimentationmachinestracking/-/tree/master/miniCloud?ref_type=heads).

### Webhook

Config at `/home/atmosphere/webhook/hooks.yaml`:

```yaml
- id: redeploy-edtlab-webhook
  execute-command: "/home/atmosphere/webhook/scripts/redeploy-edtlab.sh"
  command-working-directory: "/home/atmosphere/webhook/scripts"
```

`redeploy-edtlab.sh`:

```sh
#!/bin/bash
CONTAINER_NAME="astro_app"

/usr/bin/docker pull pierretre/edtlab:latest
/usr/bin/docker stop $CONTAINER_NAME || true
/usr/bin/docker rm $CONTAINER_NAME || true
/usr/bin/docker run -p 4001:80 --name $CONTAINER_NAME pierretre/edtlab:latest
```

**Verify before relying on this**: the container listens on port `4321` (`Dockerfile.prod` `EXPOSE 4321`, and `docker-compose.yml` maps `4001:4321`), but this script maps `4001:80`. Check whether the live script on the server matches what's written here — if it does, redeploys through this path are mapping the wrong port.

Trigger manually:

```sh
curl -X POST http://127.0.0.1:9000/hooks/redeploy-edtlab-webhook   # from the server
curl -X POST https://edtlab.fr/hooks/redeploy-edtlab-webhook       # remote (Docker Hub's target)
```

### Nginx

Config at `/etc/nginx/sites-enabled/edt-lab.fr` and `/etc/nginx/sites-enabled/www.edt-lab.fr` — keep both in sync.

```sh
sudo nginx -t && sudo systemctl restart nginx
```

### Analytics

Matomo runs as Docker services on the same server — see [Matomo Setup — Production](../deployment/matomo-setup.md).
