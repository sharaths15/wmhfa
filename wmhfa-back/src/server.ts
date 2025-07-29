import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { config } from './config/env';

const start = async () => {
  try {
    const app = await createApp();

    await app.listen({
      host: config.HOST,
      port: config.PORT,
    });

    console.log(`🚀 Server running at http://${config.HOST}:${config.PORT}`);
    console.log(
      `📊 Health check: http://${config.HOST}:${config.PORT}/api/v1/health`,
    );
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

const gracefulShutdown = (signal: string) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  process.exit(0);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

start();
