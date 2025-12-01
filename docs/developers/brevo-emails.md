```
# PHP Contact API Docker Documentation

This guide explains how to **build, launch, and test** the PHP-FPM Docker container for your contact form API.

---

## 1️⃣ Project Structure

```
project/
├─ api/                    # PHP API
│  ├─ index.php
│  ├─ composer.json
│  ├─ composer.lock
│  └─ www.conf.override    # PHP-FPM config
├─ static/                 # Optional: your static site
└─ .env                    # Environment variables (Brevo API key, etc.)
```

---

## 2️⃣ www.conf.override (PHP-FPM configuration)

Create `api/www.conf.override` with the following:

```ini
; Listen on TCP port 9000
listen = 0.0.0.0:9000
listen.allowed_clients = 0.0.0.0  ; allow any IP

; Required user/group
user = www-data
group = www-data

; Pool settings
pm = dynamic
pm.max_children = 5
pm.start_servers = 2
pm.min_spare_servers = 1
pm.max_spare_servers = 3
```

> ⚠️ Do **not** overwrite this with a simple `echo "listen=..."` in the Dockerfile — it will remove `user` and `group` and FPM will fail.

---

## 3️⃣ Dockerfile

```dockerfile
FROM php:8.2-fpm-alpine

WORKDIR /var/www/html

# Copy API code
COPY . /var/www/html

# Copy PHP-FPM override
COPY www.conf.override /usr/local/etc/php-fpm.d/www.conf

# Install composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

EXPOSE 9000

CMD ["php-fpm"]
```

---

## 4️⃣ Environment Variables

Create `.env` in the `api` folder:

```
BREVO_API_KEY=your_brevo_api_key
LIST_INBOX=contact@yourdomain.com
```

> Replace with your real Brevo API key and target email address.

---

## 5️⃣ Build the Docker image

```bash
docker build -t php-contact-api ./api
```

---

## 6️⃣ Run the container

```bash
docker run -d \
  --name contact-api \
  --env-file ./api/.env \
  -p 9000:9000 \
  php-contact-api
```

- `-p 9000:9000` maps the container’s PHP-FPM port to the host.  
- Container should now run **without crashing**.

---

## 7️⃣ Verify container is running

```bash
docker ps
docker logs contact-api
```

You should see:

```
NOTICE: fpm is running, pid 1
NOTICE: ready to handle connections
```

- Any `ERROR: Connection disallowed` means `listen.allowed_clients` is not set correctly.  

---

## 8️⃣ Test PHP-FPM

> PHP-FPM speaks FastCGI, not HTTP. You **cannot curl port 9000 directly** as plain HTTP. Test via VPS Nginx proxy or a FastCGI client.

### Using VPS Nginx

Configure your Nginx server block:

```nginx
location /api/ {
    include fastcgi_params;
    fastcgi_pass 127.0.0.1:9000;   # or Docker network IP
    fastcgi_param SCRIPT_FILENAME /var/www/html/index.php;
    fastcgi_param SCRIPT_NAME /index.php;
}
```

- `/api` requests from the frontend will be forwarded to PHP-FPM.  
- Nginx handles SSL, static files, and HTTP.

---

### Optional: Test with FastCGI client

```bash
apk add fcgi
cgi-fcgi -bind -connect 127.0.0.1:9000
```

---

## 9️⃣ Test via curl (through Nginx)

Assuming Nginx proxies `/api` to PHP-FPM:

```bash
curl -X POST http://your-vps-domain/api/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "email": "alice@example.com",
    "message": "Test from curl"
  }'
```

Expected JSON response:

```json
{"success":true}
```

---

## ✅ Summary

1. `www.conf.override` defines TCP listen and user/group.  
2. Dockerfile installs dependencies, copies config, exposes 9000.  
3. Run container with port 9000 exposed.  
4. VPS Nginx proxies `/api` to PHP-FPM.  
5. Test API via Nginx; do not curl port 9000 directly.  

This setup allows your **static site frontend** to call `/api` for contact form submissions while keeping PHP-FPM lightweight and separate from Nginx.
```

