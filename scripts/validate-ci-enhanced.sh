#!/bin/bash

# Enhanced CI Validation Script
# Validates the enhanced CI pipeline configuration

set -e

echo "🔍 Validating enhanced CI pipeline configuration..."

# Check if required files exist
required_files=(
    ".github/workflows/ci.yml"
    "src/test/e2e/link-verification.spec.ts"
    "src/test/e2e/accessibility.spec.ts"
    "src/test/e2e/routes.spec.ts"
    "playwright.config.ts"
    "playwright.ci.config.ts"
)

echo "📁 Checking required files..."
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
        exit 1
    fi
done

# Check CI configuration files
echo ""
echo "🔧 Checking CI configuration files..."
if [ -f "playwright.ci.config.ts" ]; then
    echo "✅ playwright.ci.config.ts exists for CI-specific configuration"
else
    echo "❌ playwright.ci.config.ts is missing"
    exit 1
fi

# Validate CI workflow syntax
echo ""
echo "📋 Validating CI workflow structure..."

# Check if all required jobs are present
required_jobs=(
    "test"
    "accessibility-test"
    "link-verification"
    "route-validation"
    "quality-gates"
    "deployment-check"
)

for job in "${required_jobs[@]}"; do
    if grep -q "$job:" .github/workflows/ci.yml; then
        echo "✅ Job '$job' found in CI workflow"
    else
        echo "❌ Job '$job' missing from CI workflow"
        exit 1
    fi
done

# Check if link-verification job has proper dependencies
if grep -q "needs: \[test, accessibility-test, link-verification, route-validation\]" .github/workflows/ci.yml; then
    echo "✅ Quality gates job has correct dependencies"
else
    echo "⚠️  Quality gates job dependencies may need review"
fi

# Validate Playwright configuration
echo ""
echo "🎭 Validating Playwright configuration..."
if grep -q "testDir.*src/test/e2e" playwright.config.ts; then
    echo "✅ Playwright test directory is correctly configured"
else
    echo "❌ Playwright test directory configuration issue"
    exit 1
fi

# Check if package.json has required scripts
echo ""
echo "📦 Checking package.json scripts..."
required_scripts=(
    "test"
    "build"
    "preview"
    "check"
)

if [ -f "package.json" ]; then
    for script in "${required_scripts[@]}"; do
        if grep -q "\"$script\":" package.json; then
            echo "✅ npm script '$script' found"
        else
            echo "⚠️  npm script '$script' may be missing"
        fi
    done
else
    echo "❌ package.json not found"
    exit 1
fi

echo ""
echo "✅ Enhanced CI pipeline validation completed successfully!"
echo ""
echo "📋 Summary of enhancements:"
echo "  - Comprehensive link verification with Playwright"
echo "  - Enhanced route testing using existing Playwright tests"
echo "  - Improved CI job dependencies and workflow"
echo "  - Separate CI configuration for better server management"
echo ""
echo "🚀 The CI pipeline is ready for enhanced testing!"