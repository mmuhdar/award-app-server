import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthController, ProfileController } from './profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminMiddleware } from 'src/middlewares/admin.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileController, AuthController],
  providers: [ProfileService],
})
export class ProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes(ProfileController);
  }
}
