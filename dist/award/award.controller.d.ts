import { AwardService } from './award.service';
import { CreateAwardDto } from './dto';
import { TokenPayload } from 'src/profile/interface';
export declare class AwardController {
    private readonly awardService;
    constructor(awardService: AwardService);
    create(createAwardDto: CreateAwardDto): Promise<import(".prisma/client").Award>;
    findAll(user: TokenPayload): Promise<import(".prisma/client").Award[]>;
}
