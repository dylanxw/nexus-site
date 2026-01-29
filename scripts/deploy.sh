#!/bin/bash
# ===========================================
# Nexus Tech Solutions - Deployment Script
# Run this from the /var/www/nexus directory
# ===========================================

set -e  # Exit on any error

APP_DIR="/var/www/nexus"
cd $APP_DIR

echo "=========================================="
echo "  Deploying Nexus Tech Solutions"
echo "=========================================="

# Pull latest changes
echo ">>> Pulling latest code..."
git pull origin main

# Install dependencies
echo ">>> Installing dependencies..."
npm ci --production=false

# Generate Prisma client
echo ">>> Generating Prisma client..."
npx prisma generate

# Run database migrations
echo ">>> Running database migrations..."
npx prisma migrate deploy

# Build the application
echo ">>> Building Next.js application..."
npm run build

# Restart the application
echo ">>> Restarting application..."
pm2 restart nexus || pm2 start npm --name "nexus" -- start

# Save PM2 process list
pm2 save

echo ""
echo "=========================================="
echo "  Deployment complete!"
echo "=========================================="
echo ""
echo "Check status with: pm2 status"
echo "View logs with: pm2 logs nexus"
echo ""
