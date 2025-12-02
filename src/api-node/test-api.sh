#!/bin/bash

# Test script for EDT Lab API (Node.js)

API_URL="${API_URL:-http://localhost:4004}"

echo "Testing EDT Lab API at $API_URL"
echo "================================"
echo ""

# Test 1: Health check
echo "1. Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL/health")
HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n1)
BODY=$(echo "$HEALTH_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Health check passed"
    echo "   Response: $BODY"
else
    echo "❌ Health check failed (HTTP $HTTP_CODE)"
    echo "   Response: $BODY"
fi
echo ""

# Test 2: Contact form submission
echo "2. Testing contact form submission..."
CONTACT_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "organization": "Test Organization",
    "subject": "general",
    "message": "This is a test message from the API test script.",
    "privacy": true
  }')

HTTP_CODE=$(echo "$CONTACT_RESPONSE" | tail -n1)
BODY=$(echo "$CONTACT_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Contact form submission passed"
    echo "   Response: $BODY"
else
    echo "❌ Contact form submission failed (HTTP $HTTP_CODE)"
    echo "   Response: $BODY"
fi
echo ""

# Test 3: Missing fields validation
echo "3. Testing validation (missing fields)..."
VALIDATION_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com"
  }')

HTTP_CODE=$(echo "$VALIDATION_RESPONSE" | tail -n1)
BODY=$(echo "$VALIDATION_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "400" ]; then
    echo "✅ Validation test passed (correctly rejected)"
    echo "   Response: $BODY"
else
    echo "❌ Validation test failed (HTTP $HTTP_CODE)"
    echo "   Response: $BODY"
fi
echo ""

# Test 4: Privacy not accepted
echo "4. Testing privacy validation..."
PRIVACY_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "general",
    "message": "Test message",
    "privacy": false
  }')

HTTP_CODE=$(echo "$PRIVACY_RESPONSE" | tail -n1)
BODY=$(echo "$PRIVACY_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "400" ]; then
    echo "✅ Privacy validation passed (correctly rejected)"
    echo "   Response: $BODY"
else
    echo "❌ Privacy validation failed (HTTP $HTTP_CODE)"
    echo "   Response: $BODY"
fi
echo ""

# Test 5: Rate limiting (if enabled)
echo "5. Testing rate limiting..."
echo "   Submitting first request..."
curl -s -X POST "$API_URL/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rate Test",
    "email": "rate@example.com",
    "subject": "general",
    "message": "First request",
    "privacy": true
  }' > /dev/null

echo "   Submitting second request immediately..."
RATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rate Test",
    "email": "rate@example.com",
    "subject": "general",
    "message": "Second request",
    "privacy": true
  }')

HTTP_CODE=$(echo "$RATE_RESPONSE" | tail -n1)
BODY=$(echo "$RATE_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "429" ]; then
    echo "✅ Rate limiting working (correctly rejected)"
    echo "   Response: $BODY"
else
    echo "⚠️  Rate limiting test inconclusive (HTTP $HTTP_CODE)"
    echo "   Response: $BODY"
    echo "   Note: Rate limit may not trigger if enough time has passed"
fi
echo ""

echo "================================"
echo "API testing complete!"
