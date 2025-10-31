#!/bin/bash

# Matomo Analytics Deployment Script
# This script sets up and deploys Matomo analytics with Docker

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
ENV_FILE="$PROJECT_ROOT/.env.matomo"
COMPOSE_FILE="$PROJECT_ROOT/docker-compose.matomo.yml"
NGINX_DIR="$PROJECT_ROOT/nginx"
SSL_DIR="$NGINX_DIR/ssl"

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
    
    log_success "Dependencies check passed"
}

check_environment() {
    log_info "Checking environment configuration..."
    
    if [[ ! -f "$ENV_FILE" ]]; then
        log_warning "Environment file not found. Creating from example..."
        if [[ -f "$PROJECT_ROOT/.env.matomo.example" ]]; then
            cp "$PROJECT_ROOT/.env.matomo.example" "$ENV_FILE"
            log_warning "Please edit $ENV_FILE with your configuration before continuing."
            exit 1
        else
            log_error "Example environment file not found."
            exit 1
        fi
    fi
    
    # Source environment file
    source "$ENV_FILE"
    
    # Check required variables
    required_vars=("MYSQL_ROOT_PASSWORD" "MYSQL_PASSWORD" "MATOMO_URL")
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var}" ]]; then
            log_error "Required environment variable $var is not set in $ENV_FILE"
            exit 1
        fi
    done
    
    log_success "Environment configuration check passed"
}

setup_ssl() {
    log_info "Setting up SSL certificates..."
    
    mkdir -p "$SSL_DIR"
    
    if [[ ! -f "$SSL_DIR/matomo.crt" ]] || [[ ! -f "$SSL_DIR/matomo.key" ]]; then
        log_warning "SSL certificates not found."
        
        read -p "Do you want to generate self-signed certificates for testing? (y/N): " -n 1 -r
        echo
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            log_info "Generating self-signed certificates..."
            
            # Extract domain from MATOMO_URL
            DOMAIN=$(echo "$MATOMO_URL" | sed 's|https\?://||' | sed 's|/.*||')
            
            openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
                -keyout "$SSL_DIR/matomo.key" \
                -out "$SSL_DIR/matomo.crt" \
                -subj "/C=FR/ST=France/L=Paris/O=EDT Research/CN=$DOMAIN"
            
            log_success "Self-signed certificates generated"
            log_warning "For production, please use proper SSL certificates (e.g., Let's Encrypt)"
        else
            log_error "SSL certificates are required. Please provide certificates or generate them."
            exit 1
        fi
    else
        log_success "SSL certificates found"
    fi
}

setup_directories() {
    log_info "Setting up directories..."
    
    # Create necessary directories
    mkdir -p "$PROJECT_ROOT/matomo/config"
    mkdir -p "$PROJECT_ROOT/matomo/logs"
    
    # Set proper permissions
    chmod 755 "$PROJECT_ROOT/matomo/config"
    chmod 755 "$PROJECT_ROOT/matomo/logs"
    
    log_success "Directories setup completed"
}

deploy_matomo() {
    log_info "Deploying Matomo stack..."
    
    # Load environment variables
    export $(grep -v '^#' "$ENV_FILE" | xargs)
    
    # Deploy with Docker Compose
    docker-compose -f "$COMPOSE_FILE" up -d
    
    log_success "Matomo stack deployed"
}

wait_for_services() {
    log_info "Waiting for services to be ready..."
    
    # Wait for database
    log_info "Waiting for database to be ready..."
    timeout=60
    while ! docker exec matomo-mysql mysqladmin ping -h localhost --silent; do
        sleep 2
        timeout=$((timeout - 2))
        if [[ $timeout -le 0 ]]; then
            log_error "Database failed to start within 60 seconds"
            exit 1
        fi
    done
    
    # Wait for Matomo
    log_info "Waiting for Matomo to be ready..."
    timeout=120
    while ! curl -f -s "$MATOMO_URL" > /dev/null; do
        sleep 5
        timeout=$((timeout - 5))
        if [[ $timeout -le 0 ]]; then
            log_error "Matomo failed to start within 120 seconds"
            exit 1
        fi
    done
    
    log_success "All services are ready"
}

show_status() {
    log_info "Checking service status..."
    
    docker-compose -f "$COMPOSE_FILE" ps
    
    echo
    log_info "Service URLs:"
    echo "  Matomo: $MATOMO_URL"
    echo "  Direct access: http://localhost:8080"
    
    echo
    log_info "Next steps:"
    echo "  1. Access Matomo at $MATOMO_URL"
    echo "  2. Complete the installation wizard"
    echo "  3. Configure GDPR compliance settings"
    echo "  4. Add your website to Matomo"
    echo "  5. Update your website environment variables"
}

backup_data() {
    log_info "Creating backup..."
    
    BACKUP_DIR="$PROJECT_ROOT/backups/matomo-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Backup database
    docker exec matomo-mysql mysqldump -u root -p"$MYSQL_ROOT_PASSWORD" matomo > "$BACKUP_DIR/database.sql"
    
    # Backup Matomo files
    docker cp matomo-app:/var/www/html "$BACKUP_DIR/files"
    
    log_success "Backup created at $BACKUP_DIR"
}

stop_services() {
    log_info "Stopping Matomo services..."
    docker-compose -f "$COMPOSE_FILE" down
    log_success "Services stopped"
}

remove_services() {
    log_warning "This will remove all Matomo containers and data!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Removing Matomo services and data..."
        docker-compose -f "$COMPOSE_FILE" down -v
        docker volume prune -f
        log_success "Services and data removed"
    else
        log_info "Operation cancelled"
    fi
}

show_logs() {
    service=${1:-""}
    if [[ -n "$service" ]]; then
        docker-compose -f "$COMPOSE_FILE" logs -f "$service"
    else
        docker-compose -f "$COMPOSE_FILE" logs -f
    fi
}

show_help() {
    echo "Matomo Analytics Deployment Script"
    echo
    echo "Usage: $0 [COMMAND]"
    echo
    echo "Commands:"
    echo "  deploy     Deploy Matomo stack (default)"
    echo "  status     Show service status"
    echo "  stop       Stop services"
    echo "  start      Start services"
    echo "  restart    Restart services"
    echo "  logs       Show logs [service]"
    echo "  backup     Create backup"
    echo "  remove     Remove services and data"
    echo "  help       Show this help"
    echo
    echo "Examples:"
    echo "  $0 deploy          # Deploy Matomo"
    echo "  $0 logs matomo     # Show Matomo logs"
    echo "  $0 backup          # Create backup"
}

# Main script
main() {
    local command=${1:-"deploy"}
    
    case "$command" in
        "deploy")
            check_dependencies
            check_environment
            setup_ssl
            setup_directories
            deploy_matomo
            wait_for_services
            show_status
            ;;
        "status")
            show_status
            ;;
        "stop")
            stop_services
            ;;
        "start")
            docker-compose -f "$COMPOSE_FILE" up -d
            log_success "Services started"
            ;;
        "restart")
            docker-compose -f "$COMPOSE_FILE" restart
            log_success "Services restarted"
            ;;
        "logs")
            show_logs "$2"
            ;;
        "backup")
            check_environment
            backup_data
            ;;
        "remove")
            remove_services
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