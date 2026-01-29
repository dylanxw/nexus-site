// PM2 Ecosystem Configuration
// Used for process management on the VPS

module.exports = {
  apps: [
    {
      name: 'nexus',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/nexus',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/www/nexus/logs/error.log',
      out_file: '/var/www/nexus/logs/output.log',
      log_file: '/var/www/nexus/logs/combined.log',
      time: true,
    },
  ],
};
