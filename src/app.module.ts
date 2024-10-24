import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { HealthController } from './controllers/health.controller';
import { AppService } from './app.service';
import { TerminusModule } from '@nestjs/terminus';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [TerminusModule],
  controllers: [AppController, HealthController],
  providers: [AppService, UserService, PrismaService, PostService],
})
export class AppModule { }
