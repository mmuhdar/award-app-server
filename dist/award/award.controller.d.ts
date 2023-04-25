import { AwardService } from './award.service';
import { CreateAwardDto } from './dto';
import { TokenPayload } from 'src/profile/interface';
import { AwardQuery } from './interface';
export declare class AwardController {
    private readonly awardService;
    constructor(awardService: AwardService);
    create(createAwardDto: CreateAwardDto): Promise<import(".prisma/client").Award>;
    findAll(user: TokenPayload, query: AwardQuery): Promise<import(".prisma/client").Award[]>;
}
