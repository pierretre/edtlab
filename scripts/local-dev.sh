#!/bin/bash

# Local Development Script for EDT Research Website with Matomo Analytics
# This script helps set up and manage local development environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
LOCAL_ENV_FILE="$PROJECT_ROOT/.env.local"
MATOMO_LOCAL_ENV="$PROJECT_ROOT/.env.matomo.local"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_dependencies() {
    log_info "Checking dependencies..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    log_success "Dependencies check passed"
}

setup_local_env() {
    log_info "Setting up local environment files..."
    
    # Create local environment for website
    if [[ ! -f "$LOCAL_ENV_FILE" ]]; then
        log_info "Creating .env.local for website..."
        cat > "$LOCAL_ENV_FILE" << EOF
# EDT Research Website Local Environment

# Matomo Analytics Configuration
MATOMO_URL=http://localhost:8080
MATOMO_SITE_ID=1
MATOMO_AUTH_TOKEN=

# Anonymous Analytics Settings
MATOMO_RESPECT_DNT=1
MATOMO_ANONYMIZE_IP=1
MATOMO_DISABLE_COOKIES=1

# Development Settings (enable analytics in development)
MATOMO_DEV_MODE=1

# Site Configuration
SITE_URL=http://localhost:4321
SITE_NAME="EDT Research Program (Local)"

# Build Configuration
NODE_ENV=development
EOF
        log_success "Created .env.local"
    else
        log_info ".env.local already exists"
    fi
    
    # Create local environment for Matomo
    if [[ ! -f "$MATOMO_LOCAL_ENV" ]]; then
        log_info "Creating .env.matomo.local for Matomo..."
        cat > "$MATOMO_LOCAL_ENV" << EOF
# Matomo Local Development Environment

# Local Database Configuration
MYSQL_ROOT_PASSWORD=REDACTED
MYSQL_DATABASE=matomo_local
MYSQL_USER=matomo_local
MYSQL_PASSWORD=REDACTED

# Local Matomo Configuration
MATOMO_URL=http://localhost:8080
MATOMO_SITE_ID=1
MATOMO_AUTH_TOKEN=

# Anonymous Analytics Settings
MATOMO_RESPECT_DNT=1
MATOMO_ANONYMIZE_IP=1
MATOMO_DISABLE_COOKIES=1

# Development mode enabled
MATOMO_DEV_MODE=1
EOF
        log_success "Created .env.matomo.local"
    else
        log_info ".env.matomo.local already exists"
    fi
}

setup_matomo() {
    log_info "Setting up local Matomo instance..."
    
    # Create necessary directories
    mkdir -p "$PROJECT_ROOT/matomo/local-config"
    mkdir -p "$PROJECT_ROOT/matomo/local-logs"
    
    # Load environment variables
    source "$MATOMO_LOCAL_ENV"
    
    # Start Matomo services
    log_info "Starting Matomo services..."
    docker-compose -f "$PROJECT_ROOT/docker-compose.matomo.yml" -f "$PROJECT_ROOT/docker-compose.local.yml" up -d
    
    # Wait for services to be ready
    log_info "Waiting for Matomo to be ready..."
    timeout=60
    while ! curl -f -s http://localhost:8080 > /dev/null; do
        sleep 2
        timeout=$((timeout - 2))
        if [[ $timeout -le 0 ]]; then
            log_error "Matomo failed to start within 60 seconds"
            exit 1
        fi
    done
    
    log_success "Matomo is ready at http://localhost:8080"
    log_info "Complete the setup wizard in your browser:"
    log_info "1. Go to http://localhost:8080"
    log_info "2. Database settings:"
    log_info "   - Server: matomo-db"
    log_info "   - Login: matomo_local"
    log_info "   - Password: REDACTED"
    log_info "   - Database: matomo_local"
    log_info "3. Create admin user"
    log_info "4. Add website: http://localhost:4321"
    log_info "5. Configure anonymous analytics (disable cookies)"
}

setup_website() {
    log_info "Setting up website..."
    
    # Install dependencies
    log_info "Installing npm dependencies..."
    cd "$PROJECT_ROOT"
    npm install
    
    log_success "Website dependencies installed"
}

start_website() {
    log_info "Starting website development server..."
    
    cd "$PROJECT_ROOT"
    
    # Load local environment
    if [[ -f "$LOCAL_ENV_FILE" ]]; then
        export $(grep -v '^#' "$LOCAL_ENV_FILE" | xargs)
    fi
    
    log_success "Website starting at http://localhost:4321"
    log_info "Press Ctrl+C to stop the development server"
    
    npm run dev
}

stop_services() {
    log_info "Stopping all services..."
    
    # Stop Matomo
    docker-compose -f "$PROJECT_ROOT/docker-compose.matomo.yml" -f "$PROJECT_ROOT/docker-compose.local.yml" down
    
    log_success "All services stopped"
}

show_status() {
    log_info "Service Status:"
    
    # Check Matomo containers
    echo "Matomo Services:"
    docker-compose -f "$PROJECT_ROOT/docker-compose.matomo.yml" -f "$PROJECT_ROOT/docker-compose.local.yml" ps
    
    echo
    log_info "Access URLs:"
    echo "  Website: http://localhost:4321"
    echo "  Matomo: http://localhost:8080"
    
    echo
    log_info "Useful commands:"
    echo "  View Matomo logs: docker-compose -f docker-compose.matomo.yml -f docker-compose.local.yml logs -f matomo"
    echo "  Access Matomo container: docker exec -it matomo-app bash"
    echo "  Access MySQL: docker exec -it matomo-mysql mysql -u matomo_local -p"
}

show_help() {
    echo "EDT Research Website Local Development Script"
    echo
    echo "Usage: $0 [COMMAND]"
    echo
    echo "Commands:"
    echo "  setup      Set up local development environment"
    echo "  start      Start website development server"
    echo "  matomo     Set up and start Matomo services"
    echo "  stop       Stop all services"
    echo "  status     Show service status"
    echo "  logs       Show Matomo logs"
    echo "  reset      Reset local environment"
    echo "  help       Show this help"
    echo
    echo "Examples:"
    echo "  $0 setup    # Set up everything for first time"
    echo "  $0 start    # Start website development"
    echo "  $0 matomo   # Set up Matomo only"
    echo "  $0 status   # Check service status"
}

show_logs() {
    docker-compose -f "$PROJECT_ROOT/docker-compose.matomo.yml" -f "$PROJECT_ROOT/docker-compose.local.yml" logs -f matomo
}

reset_environment() {
    log_warning "This will remove all local data and containers!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Resetting local environment..."
        
        # Stop and remove containers
        docker-compose -f "$PROJECT_ROOT/docker-compose.matomo.yml" -f "$PROJECT_ROOT/docker-compose.local.yml" down -v
        
        # Remove local directories
        rm -rf "$PROJECT_ROOT/matomo/local-config"
        rm -rf "$PROJECT_ROOT/matomo/local-logs"
        
        # Remove environment files
        rm -f "$LOCAL_ENV_FILE"
        rm -f "$MATOMO_LOCAL_ENV"
        
        log_success "Local environment reset"
        log_info "Run '$0 setup' to set up again"
    else
        log_info "Reset cancelled"
    fi
}

# Main script
main() {
    local command=${1:-"help"}
    
    case "$command" in
        "setup")
            check_dependencies
            setup_local_env
            setup_website
            setup_matomo
            log_success "Local development environment set up successfully!"
            log_info "Next steps:"
            log_info "1. Complete Matomo setup at http://localhost:8080"
            log_info "2. Update MATOMO_AUTH_TOKEN in .env.local"
            log_info "3. Run '$0 start' to start development server"
            ;;
        "start")
            start_website
            ;;
        "matomo")
            check_dependencies
            setup_local_env
            setup_matomo
            ;;
        "stop")
            stop_services
            ;;
        "status")
            show_status
            ;;
        "logs")
            show_logs
            ;;
        "reset")
            reset_environment
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            log_error "Unknown command: $command"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"