import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthController, ProfileController } from './profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileController, AuthController],
  providers: [ProfileService],
})
export class ProfileModule {}
