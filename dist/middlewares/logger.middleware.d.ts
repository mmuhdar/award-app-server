import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class LoggerMiddleware implements NestMiddleware {
    private prisma;
    constructor(prisma: PrismaService);
    use(req: any, res: Response, next: NextFunction): Promise<void>;
}
