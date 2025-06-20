import { Module } from '@nestjs/common';
import { GenerateStoryModule } from './generate-story/generate-story.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    GenerateStoryModule,
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}
