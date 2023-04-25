import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AwardModule } from './award/award.module';
import { ProfileModule } from './profile/profile.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AwardController } from './award/award.controller';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [PrismaModule, AwardModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        {
          path: 'register',
          method: RequestMethod.POST,
        },
        {
          path: 'login',
          method: RequestMethod.POST,
        },
        {
          path: '',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(AppController, AwardController, ProfileController);
  }
}
