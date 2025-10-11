import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  checks: {
    database: {
      status: 'up' | 'down';
      responseTime?: number;
      error?: string;
    };
    email: {
      status: 'configured' | 'not_configured';
      smtp?: string;
    };
    environment: {
      nodeEnv: string;
      nextVersion: string;
    };
  };
}

export async function GET() {
  const startTime = Date.now();
  const healthCheck: HealthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    checks: {
      database: {
        status: 'down',
      },
      email: {
        status: 'not_configured',
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        nextVersion: '15.5.4',
      },
    },
  };

  // Check database connection
  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const dbEnd = Date.now();

    healthCheck.checks.database = {
      status: 'up',
      responseTime: dbEnd - dbStart,
    };
  } catch (error) {
    healthCheck.status = 'degraded';
    healthCheck.checks.database = {
      status: 'down',
      error: error instanceof Error ? error.message : 'Unknown database error',
    };
  }

  // Check email configuration
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    healthCheck.checks.email = {
      status: 'configured',
      smtp: process.env.SMTP_HOST,
    };
  } else {
    healthCheck.checks.email = {
      status: 'not_configured',
    };
  }

  // Determine overall status
  if (healthCheck.checks.database.status === 'down') {
    healthCheck.status = 'unhealthy';
  } else if (healthCheck.checks.email.status === 'not_configured') {
    healthCheck.status = 'degraded';
  }

  // Return appropriate HTTP status code
  const statusCode =
    healthCheck.status === 'healthy' ? 200 :
    healthCheck.status === 'degraded' ? 200 :
    503; // Service Unavailable for unhealthy

  return NextResponse.json(healthCheck, {
    status: statusCode,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

// Simple ping endpoint for uptime monitoring
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
