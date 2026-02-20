# Nginx Configuration Guide

This guide explains the two-tier Nginx setup for the EDT website.

## Architecture Overview

```
Internet (Port 443)
    ↓
Root Nginx (Stream Module) - SNI-based routing
    ↓
Site Nginx (Port 4443) - HTTP/HTTPS proxy
    ↓
Docker Containers (Ports 4001, 4002)
```

## Why This Setup?

This architecture allows:

- **Multiple sites** on one server with different backends
- **SNI-based routing** at the TCP level (before SSL termination)
- **Seamless URLs** - users always connect to port 443
- **Flexible backend** - each site can have its own Nginx config

---

## Site-Specific Nginx Configuration

**Location**: `/etc/nginx/sites-available/edtlab.fr` (or similar)

```nginx
server {

    server_name edtlab.fr;
    listen 4443 ssl;
    ssl_certificate /etc/letsencrypt/live/edtlab.fr/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/edtlab.fr/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";

    # Proxy for Astro app
    location / {
        proxy_pass http://127.0.0.1:4001/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        auth_basic "Under Development";
        auth_basic_user_file /home/atmosphere/.htpasswd;
    }

    # Redirect /matomo to /matomo/ for consistency
    location = /matomo {
        return 301 $scheme://$host/matomo/;
    }

    # Proxy for Matomo under /matomo/
    location /matomo/ {
        proxy_pass http://127.0.0.1:4002/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        auth_basic "Under Development";
        auth_basic_user_file /home/atmosphere/.htpasswd;
    }

    location /hooks/redeploy-webhook {
        include proxy_params;
        proxy_pass http://127.0.0.1:9000/hooks/redeploy-edtlab-webhook;
    }

}


server {
    if ($host = edtlab.fr) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name edtlab.fr;
 
    listen 80;
    return 404; # managed by Certbot
}

```

**Key Points:**

- Listens on port 4443 (receives traffic from root nginx)
- Terminates SSL here (not at root nginx)
- Proxies to Docker containers on localhost

---

## Docker Port Mapping

**docker-compose.yml:**

```yaml
services:
  web:
    ports:
      - "0.0.0.0:4001:80"  # Astro website

  matomo:
    ports:
      - "0.0.0.0:4002:80"  # Matomo
  
  matomo-db:
    ports:
      - "0.0.0.0:4003:3306"  # MySQL
```

---

## Traffic Flow

### Production (External Access)

```
User Browser
  ↓ https://edtlab.fr/api (port 443)
Root Nginx (Stream)
  ↓ Routes to 10.0.0.2:4443 based on SNI
Site Nginx
  ↓ Terminates SSL
Docker Container (API)
  ↓ Node.js processes request on port 8080
```

## Testing the Configuration

### 1. Test Root Nginx

```bash
# Check if root nginx is listening on 443
sudo netstat -tlnp | grep :443

# Test SNI routing
openssl s_client -connect edtlab.fr:443 -servername edtlab.fr
```

### 2. Test Site Nginx

```bash
# Check if site nginx is listening on 4443
sudo netstat -tlnp | grep :4443

# Test SSL certificate
curl -I https://edtlab.fr
```

### 3. Test API Endpoint

```bash
# Test from external
curl -X POST https://edtlab.fr/api \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"general","message":"Test message","privacy":true}'

# Test from server
curl -X POST http://127.0.0.1:4001 \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"general","message":"Test message","privacy":true}'
```

---

## Troubleshooting

### Issue: "Connection refused" on port 443

**Solution**: Check if root nginx is running and listening on port 443

```bash
sudo systemctl status nginx
sudo nginx -t  # Test configuration
```

### Issue: SSL certificate errors

**Solution**: Ensure certificates are valid and paths are correct

```bash
sudo certbot certificates
sudo nginx -t
```

---

## Security Considerations

1. **Remove auth_basic** from production (currently protecting development site)
2. **Rate limiting** on `/api/` to prevent abuse
3. **Firewall rules** to restrict access to Docker ports (4001-4003)
4. **SSL certificates** should be renewed automatically (certbot)
5. **HSTS** is enabled with 1-year max-age

---

## Maintenance

### Reload Nginx Configuration

```bash
# Test configuration
sudo nginx -t

# Reload without downtime
sudo systemctl reload nginx
```

### Update SSL Certificates

```bash
# Renew certificates
sudo certbot renew

# Reload nginx to use new certificates
sudo systemctl reload nginx
```

### View Logs

```bash
# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```
