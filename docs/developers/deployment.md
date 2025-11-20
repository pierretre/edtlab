
# Deployment Guide

This document describes the current deployment flow used by this project:

- A release must be created from github interface.
- The CI pipeline builds the Docker image and pushes it to Docker Hub (<https://hub.docker.com/repositories/pierretre>).
- A webhook on the production server (triggered by Docker Hub) pulls the new image and restarts the running container.

This page provides the guideleines to understand, use, and debug the CI steps, webhook receiver approach and serverside configuration.

## Creating a release

This project uses GitHub "Releases" (the release publish flow) rather than creating raw git tags locally. The repository already contains a CI workflow that listens for the `release` event and builds/publishes Docker images when a release is published.

Summary:

- Create a Release on GitHub (via the web UI or `gh` CLI) and publish it.
- The CI workflow `.github/workflows/docker-build-publish.yml` triggers on `release: published`, builds the production image, tags it with the release name and `latest`, and pushes both tags to Docker Hub.

How to create and publish a release (web UI):

1. Go to the repository on GitHub.
2. Click "Releases" → "Draft a new release".
3. Set the tag name (e.g. `v1.2.0`) and fill the release title and notes (changelog or summary of changes).
4. Choose "Publish release" (publishing triggers the CI workflow).

How to create and publish a release (GitHub CLI):

```sh
# create a draft release and open an editor for notes
gh release create v1.2.0 --draft
# or create and publish in one step
gh release create v1.2.0 --title "v1.2.0" --notes "Summary of changes"
```

Notes and best practices:

- Use the GitHub Release notes (or a CHANGELOG) to document breaking changes and migration steps.
- Use draft releases if you want to prepare notes and assets before triggering the CI build — only "publishing" fires the `release: published` webhook.

## CI pipeline (build & push)

The pipeline should build the image, tag it, and push it to Docker Hub. Example (GitHub Actions style):

What the CI does (how it maps to releases):

- The provided workflow (`.github/workflows/docker-build-publish.yml`) runs on `release: types: [published]`.
- It reads the release name (e.g. `v1.2.0`) and builds a Docker image tagged with that release and `latest`.
- It pushes both tags to Docker Hub using the Docker Hub credentials stored in repository secrets (for example `DOCKER_HUB_USERNAME` and `DOCKER_HUB_ACCESS_TOKEN`).

Deploying released images:

- After the CI publishes the image to Docker Hub, your server webhook or deploy process should pull the new image and restart the container (see the webhook and server sections in this document).
- If you pin your `docker-compose.yml` to a specific release tag (recommended for immutable deployments), update the compose file to `image: pierretre/edtlab:v1.2.0` and run:

```sh
docker pull pierretre/edtlab:v1.2.0
docker compose -f /srv/edtlab/docker-compose.yml up -d
```

## Server configuration

The application is deployed on DiverSE team VPS named Atmosphere.

Please read the associated documentation to connect to the server (machine 10.0.0.2): [miniCloud - Gitlab Inria](https://gitlab.inria.fr/diverse/experimentationmachinestracking/-/tree/master/miniCloud?ref_type=heads)

### Webhook configuration

Once connected to the server, the webhook configuration can be found at `/home/atmosphere/webhook/hooks.yaml`.

```yaml
- id: redeploy-edtlab-webhook
  execute-command: "/home/atmosphere/webhook/scripts/redeploy-edtlab.sh"
  command-working-directory: "/home/atmosphere/webhook/scripts"
```

The second entry is the one used to trigger the webhook and launch the script `/home/atmosphere/webhook/scripts/redeploy-edtlab.sh`.

This contains the script for redploying the static files container:

```sh
#! /bin/bash
CONTAINER_NAME="astro_app"

/usr/bin/docker pull pierretre/edtlab:latest
/usr/bin/docker stop $CONTAINER_NAME || true
/usr/bin/docker rm $CONTAINER_NAME || true
/usr/bin/docker run -p 4001:80 --name $CONTAINER_NAME pierretre/edtlab:latest
```

#### Triggering the webhook

To test the webhook locally:

```sh
curl -X POST http://127.0.0.1:9000/hooks/redeploy-edtlab-webhook
```

To test it remotely (url used by Docker Hub for initiating redeployment):

```sh
curl -X POST https://edtlab.fr/hooks/redeploy-edtlab-webhook
```

### Nginx Reverse Proxy

The nginx reverse proxy configuration for edtlab can be found at:

- `/etc/nginx/sites-enabled/edt-lab.fr`
- `/etc/nginx/sites-enabled/www.edt-lab.fr`.

If required to change the nginx configurations, please replicate changes accross the two files and validate the changes before reloading the service.

```sh
# Check
sudo nginx -t

# If no error, restart nginx
sudo systemctl restart nginx
```

### Analytics deployement

The analytics are deployed via docker directly on the server, please find matomo doc here: [matomo-setup.md](matomo-setup.md)
