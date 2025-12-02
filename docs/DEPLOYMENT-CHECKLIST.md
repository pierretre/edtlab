# Node.js API Deployment Checklist

Use this checklist when deploying the Node.js API to production.

## Pre-Deployment

### 1. Environment Setup

- [ ] Copy `.env.example` to `.env.production`
- [ ] Set `BREVO_API_KEY` with valid API key
- [ ] Set `LIST_INBOX` with recipient email
- [ ] Set `SENDER_EMAIL` with sender email
- [ ] Set `SENDER_NAME` with sender name
- [ ] Set `APP_ENV=production`
- [ ] Verify all environment variables are set correctly

### 2. Build and Test

- [ ] Build Docker image: `docker-compose build api-node`
- [ ] Start container: `docker-compose up -d api-node`
- [ ] Check container status: `docker ps | grep api-node`
- [ ] Check logs: `docker logs edtlab_api_node`
- [ ] Test health endpoint: `curl http://localhost:4004/health`
- [ ] Run test script: `cd src/api-node && ./test-api.sh`

### 3. Functional Testing

- [ ] Submit test contact form from frontend
- [ ] Verify email received at `LIST_INBOX`
- [ ] Check email formatting and reply-to address
- [ ] Test rate limiting (submit twice quickly)
- [ ] Test validation (missing fields)
- [ ] Test privacy checkbox validation
- [ ] Test CORS headers from frontend domain

### 4. Security Review

- [ ] Verify CORS origins are correctly configured
- [ ] Check security headers: `curl -I http://localhost:4004/health`
- [ ] Verify container runs as non-root: `docker exec edtlab_api_node whoami`
- [ ] Review rate limiting configuration
- [ ] Ensure no sensitive data in logs
- [ ] Verify input sanitization is working

## Deployment

### 5. Production Deployment

- [ ] Stop PHP API (if running): `docker-compose stop api`
- [ ] Start Node.js API: `docker-compose up -d api-node`
- [ ] Verify container is running: `docker ps`
- [ ] Check health endpoint: `curl http://localhost:4004/health`
- [ ] Monitor logs for errors: `docker logs -f edtlab_api_node`

### 6. Smoke Testing

- [ ] Test from production frontend
- [ ] Submit real contact form
- [ ] Verify email delivery
- [ ] Check response times
- [ ] Monitor error rates

### 7. Monitoring Setup

- [ ] Set up log monitoring
- [ ] Configure health check alerts
- [ ] Monitor container resource usage
- [ ] Set up email delivery monitoring
- [ ] Configure rate limit alerts (if needed)

## Post-Deployment

### 8. Verification

- [ ] Verify API is responding: `curl http://localhost:4004/health`
- [ ] Check container health: `docker inspect edtlab_api_node | grep Health`
- [ ] Monitor logs for 24 hours: `docker logs -f edtlab_api_node`
- [ ] Verify email delivery is working
- [ ] Check error rates in logs
- [ ] Monitor resource usage (CPU, memory)

### 9. Performance Monitoring

- [ ] Check response times
- [ ] Monitor memory usage
- [ ] Check container restart count
- [ ] Review rate limiting effectiveness
- [ ] Monitor email delivery success rate

### 10. Documentation

- [ ] Update deployment documentation
- [ ] Document any issues encountered
- [ ] Update runbook with Node.js specifics
- [ ] Share deployment notes with team

## Rollback Plan

If issues occur, follow these steps:

### Immediate Rollback

```bash
# Stop Node.js API
docker-compose stop api-node

# Start PHP API
docker-compose --profile php up -d api

# Verify PHP API is working
curl http://localhost:4004/
```

### Investigation

- [ ] Check Node.js API logs: `docker logs edtlab_api_node`
- [ ] Check container status: `docker ps -a | grep api`
- [ ] Review error messages
- [ ] Check environment variables: `docker exec edtlab_api_node env`
- [ ] Verify Brevo API key is valid
- [ ] Test health endpoint: `curl http://localhost:4004/health`

### Re-deployment

After fixing issues:

```bash
# Rebuild image
docker-compose build api-node

# Start container
docker-compose up -d api-node

# Verify
curl http://localhost:4004/health
```

## Common Issues

### Container Won't Start

**Check:**
- [ ] Environment variables are set
- [ ] Port 4004 is not in use
- [ ] Docker has enough resources
- [ ] Image built successfully

**Debug:**
```bash
docker logs edtlab_api_node
docker inspect edtlab_api_node
```

### Health Check Failing

**Check:**
- [ ] Container is running
- [ ] Port 8080 is exposed
- [ ] Application started successfully

**Debug:**
```bash
docker exec edtlab_api_node curl http://localhost:8080/health
docker logs edtlab_api_node
```

### Email Not Sending

**Check:**
- [ ] `BREVO_API_KEY` is valid
- [ ] `LIST_INBOX` is correct
- [ ] Brevo account is active
- [ ] API rate limits not exceeded

**Debug:**
```bash
docker logs edtlab_api_node | grep -i brevo
docker logs edtlab_api_node | grep -i error
```

### Rate Limiting Issues

**Check:**
- [ ] Rate limit file is writable
- [ ] Correct IP detection
- [ ] Rate limit duration is appropriate

**Debug:**
```bash
docker exec edtlab_api_node ls -la /tmp/contact_form_rate_limit.json
docker exec edtlab_api_node cat /tmp/contact_form_rate_limit.json
```

### CORS Errors

**Check:**
- [ ] Origin is in allowed list
- [ ] `APP_ENV` is set correctly
- [ ] CORS headers are present

**Debug:**
```bash
curl -H "Origin: https://edtlab.fr" -I http://localhost:4004/health
docker logs edtlab_api_node | grep -i cors
```

## Success Criteria

Deployment is successful when:

- ✅ Container is running and healthy
- ✅ Health endpoint returns 200 OK
- ✅ Contact form submissions work
- ✅ Emails are delivered correctly
- ✅ Rate limiting is working
- ✅ No errors in logs
- ✅ Response times are acceptable (<100ms)
- ✅ Memory usage is stable (<100MB)
- ✅ No container restarts

## Maintenance

### Regular Tasks

**Daily:**
- [ ] Check container health
- [ ] Review error logs
- [ ] Monitor email delivery

**Weekly:**
- [ ] Review resource usage
- [ ] Check for npm security updates
- [ ] Review rate limiting effectiveness

**Monthly:**
- [ ] Update dependencies: `npm update`
- [ ] Review and update documentation
- [ ] Test rollback procedure

### Updates

When updating the API:

1. Test in development first
2. Build new image
3. Deploy during low-traffic period
4. Monitor closely for 24 hours
5. Keep previous image for quick rollback

## Support Contacts

- **Technical Issues:** [Your team contact]
- **Brevo API Issues:** support@brevo.com
- **Infrastructure:** [Your infrastructure team]

## Additional Resources

- [API Migration Guide](API-MIGRATION.md)
- [API Comparison](API-COMPARISON.md)
- [API Documentation](../src/api-node/README.md)
- [Docker Setup](../DOCKER-SETUP.md)
- [Migration Summary](../MIGRATION-SUMMARY.md)

---

**Last Updated:** December 2, 2024  
**Version:** 1.0.0  
**Maintainer:** EDT Lab Team
