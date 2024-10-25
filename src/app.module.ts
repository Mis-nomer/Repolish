import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { HealthController } from './controllers/health.controller';
import { AppService } from './app.service';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaService } from './services/prisma.service';
import { CrudMiddleware } from './middlewares/crud.middleware';

@Module({
  imports: [TerminusModule],
  controllers: [AppController, HealthController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CrudMiddleware).forRoutes('/zen');
  }

}
