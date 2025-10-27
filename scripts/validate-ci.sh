#!/bin/bash

# CI/CD Validation Script
# This script runs all validation checks for the CI/CD pipeline

set -e  # Exit on any error

echo "🚀 Starting CI/CD validation..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        exit 1
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps
print_status $? "Dependencies installed"

echo "🔍 Running TypeScript check..."
npm run check
print_status $? "TypeScript check passed"

echo "🧪 Running unit tests..."
npm run test
print_status $? "Unit tests passed"

echo "🏗️  Building project..."
npm run build
print_status $? "Build completed"

echo "✅ Validating build output..."
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build directory not found${NC}"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo -e "${RED}❌ Main index.html not found${NC}"
    exit 1
fi

if [ ! -f "dist/404.html" ]; then
    print_warning "404.html not found in build output"
fi

# Check for essential language files
essential_files=("en/index.html" "fr/index.html")
for file in "${essential_files[@]}"; do
    if [ ! -f "dist/$file" ]; then
        print_warning "$file not found in build output"
    else
        echo -e "${GREEN}✅ Found $file${NC}"
    fi
done

echo "📊 Generating test coverage report..."
npm run test:coverage
print_status $? "Coverage report generated"

echo "🎉 All CI/CD validation checks passed!"
echo ""
echo "📋 Summary:"
echo "  - Dependencies: ✅ Installed"
echo "  - TypeScript: ✅ No errors"
echo "  - Unit Tests: ✅ All passed"
echo "  - Build: ✅ Successful"
echo "  - Coverage: ✅ Generated"
echo ""
echo "🚀 Ready for deployment!"