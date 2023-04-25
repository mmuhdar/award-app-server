import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AwardService } from './award.service';
import { AwardController } from './award.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminMiddleware } from 'src/middlewares/admin.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [AwardController],
  providers: [AwardService],
})
export class AwardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .exclude({
        path: 'award',
        method: RequestMethod.GET,
      })
      .forRoutes(AwardController);
  }
}
