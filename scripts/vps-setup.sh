#!/bin/bash
# ===========================================
# Nexus Tech Solutions - VPS Setup Script
# Run this on your fresh Ubuntu VPS
# ===========================================

set -e  # Exit on any error

echo "=========================================="
echo "  Nexus VPS Setup Script"
echo "=========================================="

# Update system
echo ">>> Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install essential tools
echo ">>> Installing essential tools..."
sudo apt install -y curl git ufw nginx certbot python3-certbot-nginx

# Install Node.js 20 LTS
echo ">>> Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
echo ">>> Node.js version:"
node --version
echo ">>> npm version:"
npm --version

# Install PM2 globally
echo ">>> Installing PM2 process manager..."
sudo npm install -g pm2

# Install PostgreSQL
echo ">>> Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Configure firewall
echo ">>> Configuring firewall..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Create app directory
echo ">>> Creating application directory..."
sudo mkdir -p /var/www/nexus
sudo chown -R $USER:$USER /var/www/nexus

# Setup PM2 to start on boot
echo ">>> Configuring PM2 startup..."
pm2 startup systemd -u $USER --hp /home/$USER
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER

echo ""
echo "=========================================="
echo "  Base setup complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Setup PostgreSQL database (run: sudo -u postgres psql)"
echo "2. Clone your repository to /var/www/nexus"
echo "3. Configure environment variables"
echo "4. Setup Nginx and SSL"
echo ""
