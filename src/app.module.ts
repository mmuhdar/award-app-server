import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AwardModule } from './award/award.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [PrismaModule, AwardModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
