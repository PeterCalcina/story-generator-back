import { Module } from '@nestjs/common';
import { GenerateStoryModule } from './generate-story/generate-story.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentConfig } from './common/config/environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getEnvironmentConfig],
    }),
    GenerateStoryModule,
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}
