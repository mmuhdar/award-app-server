import { Injectable } from '@nestjs/common';
import { CreateAwardDto } from './dto';
import { errorHandler, excludeField } from 'src/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { Award } from '@prisma/client';
import { TokenPayload } from 'src/profile/interface';

@Injectable()
export class AwardService {
  constructor(private prisma: PrismaService) {}

  async create(createAwardDto: CreateAwardDto): Promise<Award> {
    try {
      const { name, type, poin, image, profileId } = createAwardDto;
      const data = await this.prisma.award.create({
        data: {
          name,
          type,
          poin,
          image,
          profileId,
        },
      });
      return data;
    } catch (error) {
      errorHandler(error);
    }
  }

  async findAll(user: TokenPayload): Promise<Award[]> {
    try {
      const { id } = user;
      const data = await this.prisma.award.findMany({
        where: { profileId: id },
        include: { owner: true },
      });
      data.forEach((el) => {
        excludeField(el.owner, ['createdAt', 'updateAt', 'role', 'email']);
      });
      return data;
    } catch (error) {
      errorHandler(error);
    }
  }
}
