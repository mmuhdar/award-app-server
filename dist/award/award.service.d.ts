import { CreateAwardDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Award } from '@prisma/client';
import { TokenPayload } from 'src/profile/interface';
export declare class AwardService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAwardDto: CreateAwardDto): Promise<Award>;
    findAll(user: TokenPayload): Promise<Award[]>;
}
