# Installation Guide

Complete setup guide for deploying the EDT Lab website on a fresh Linux server.

## Prerequisites

- **OS**: Debian/Ubuntu Linux
- **Access**: Root or sudo privileges
- **Network**: Ports 80 and 443 accessible from internet
- **DNS**: Domain pointing to server IP (e.g., `edtlab.fr`)
- **Storage**: Minimum 10GB free disk space

## Architecture Overview

```
Internet (Port 443)
    ↓
Nginx (Reverse Proxy + SSL)
    ↓
┌─────────────┬──────────────┬──────────────┐
│   Website   │   Matomo     │   Webhook    │
│  (Port 4001)│ (Port 4002)  │ (Port 9000)  │
└─────────────┴──────────────┴──────────────┘
```

## Quick Start

### 1. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io docker-compose

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx

# Install webhook tool
sudo apt install -y webhook
```

### 2. Setup Directory Structure

```bash
sudo mkdir -p /opt/edtlab/{hook,src}
cd /opt/edtlab
```

The final directory structure will look like:

```
/opt/edtlab
├── docker-compose.yml         # Docker services configuration
├── .env                        # Environment variables
├── hook/                       # Webhook scripts and logs
│   ├── nohup.out              # Webhook execution logs
│   └── redeploy.sh            # Deployment script
├── hooks.yaml                  # Webhook configuration
├── .htpasswd                   # Basic auth credentials (optional)
├── matomo-apache-config.conf   # Matomo Apache configuration
├── matomo-db-config.cnf        # Matomo database configuration
├── README.txt                  # Local deployment notes
└── src/                        # Application source code
    └── (other services)
```

**Note**: Additional files and directories will be created during deployment (Docker volumes, logs, etc.)

### 3. Configure SSL Certificates

Create temporary nginx config for certificate validation:

```bash
sudo tee /etc/nginx/sites-available/edtlab.fr <<EOF
server {
    listen 80;
    server_name edtlab.fr;
    
    location /.well-known/acme-challenge/ {
        allow all;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/edtlab.fr /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Obtain SSL certificate:

```bash
sudo certbot --nginx -d edtlab.fr
```

### 4. Configure Nginx Reverse Proxy

```bash
sudo tee /etc/nginx/sites-available/edtlab.fr <<'EOF'
server {
    listen 443 ssl http2;
    server_name edtlab.fr;

    # SSL Configuration (managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/edtlab.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/edtlab.fr/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Website
    location / {
        proxy_pass http://127.0.0.1:4001/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Matomo Analytics
    location /matomo/ {
        proxy_pass http://127.0.0.1:4002/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Webhook for deployments
    location /hooks/ {
        proxy_pass http://127.0.0.1:9000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name edtlab.fr;
    return 301 https://$host$request_uri;
}
EOF

sudo nginx -t && sudo systemctl reload nginx
```

### 5. Setup Webhook Service

Create deployment script:

```bash
sudo tee /opt/edtlab/hook/redeploy.sh <<'EOF'
#!/bin/bash
cd /opt/edtlab
git pull
docker-compose build
docker-compose up -d
EOF

sudo chmod +x /opt/edtlab/hook/redeploy.sh
```

Create webhook configuration:

```bash
sudo tee /opt/edtlab/hooks.yaml <<EOF
- id: redeploy-edtlab-webhook
  execute-command: "/opt/edtlab/hook/redeploy.sh"
  command-working-directory: "/opt/edtlab"
  response-message: "Deployment triggered"
EOF
```

Create systemd service:

```bash
sudo tee /etc/systemd/system/webhook.service <<EOF
[Unit]
Description=Webhook listener for EDT Lab deployments
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/webhook -hooks /opt/edtlab/hooks.yaml -verbose -ip 127.0.0.1 -port 9000
WorkingDirectory=/opt/edtlab
User=root
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable webhook
sudo systemctl start webhook
```

### 6. Deploy Application Services

See [nginx-configuration.md](nginx-configuration.md) for detailed Docker setup and service configuration.

## Maintenance

### Certificate Renewal

Certificates auto-renew via Certbot. Test renewal:

```bash
sudo certbot renew --dry-run
```

Optional: Create renewal hook to reload nginx:

```bash
sudo tee /etc/letsencrypt/renewal-hooks/deploy/nginx-reload.sh <<'EOF'
#!/bin/sh
systemctl reload nginx
EOF

sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/nginx-reload.sh
```

### Service Management

```bash
# Check service status
sudo systemctl status nginx
sudo systemctl status webhook
docker-compose ps

# View logs
sudo journalctl -u nginx -f
sudo journalctl -u webhook -f
docker-compose logs -f

# Restart services
sudo systemctl restart nginx
sudo systemctl restart webhook
docker-compose restart
```

## Verification Checklist

After installation, verify:

- [ ] Nginx responds on ports 80 and 443
- [ ] HTTPS redirects working correctly
- [ ] SSL certificate valid (check with `curl -I https://edtlab.fr`)
- [ ] All Docker services running (`docker-compose ps`)
- [ ] Webhook service active (`systemctl status webhook`)
- [ ] Certificate auto-renewal configured (`certbot renew --dry-run`)
- [ ] Firewall allows ports 80 and 443

## Troubleshooting

### Nginx won't start

```bash
# Check configuration
sudo nginx -t

# Check port conflicts
sudo netstat -tlnp | grep -E ':80|:443'
```

### SSL certificate issues

```bash
# Check certificate status
sudo certbot certificates

# Renew manually
sudo certbot renew --force-renewal
```

### Docker services not accessible

```bash
# Check if containers are running
docker-compose ps

# Check container logs
docker-compose logs [service-name]

# Verify port bindings
docker ps
```

## Migration Guide

When migrating to a new server:

1. **Backup data** from old server (database, uploads, config)
2. **Update DNS** to point to new server IP
3. **Wait for DNS propagation** (check with `dig edtlab.fr`)
4. **Obtain new SSL certificate** on new server
5. **Restore data** and start services
6. **Disable old server** after verification

## Security Recommendations

- Keep system and packages updated
- Use strong passwords for all services
- Restrict SSH access (key-based auth only)
- Configure firewall (ufw/iptables)
- Regular backups of data and configuration
- Monitor logs for suspicious activity
- Keep Docker images updated

## Additional Resources

- [Nginx Configuration Details](nginx-configuration.md)
