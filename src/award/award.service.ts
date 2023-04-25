import { Injectable } from '@nestjs/common';
import { CreateAwardDto } from './dto';
import { errorHandler, excludeField } from 'src/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { Award } from '@prisma/client';
import { TokenPayload } from 'src/profile/interface';
import { AwardQuery } from './interface';

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

  async findAll(user: TokenPayload, query: AwardQuery): Promise<Award[]> {
    try {
      let data;
      const { id } = user;
      let queryType;
      let queryPoin;
      if (Object.keys(query).length > 0) {
        queryType = JSON.parse(query.type);
        queryPoin = JSON.parse(query.poin);
      }

      if (!queryPoin && !queryType) {
        data = await this.prisma.award.findMany({
          where: { profileId: id },
          include: { owner: true },
        });
      } else {
        if (queryPoin[1] == 0) {
          data = await this.prisma.award.findMany({
            where: {
              profileId: id,
              AND: [
                { type: { in: queryType } },
                { poin: { gte: queryPoin[0] } },
              ],
            },
          });
        } else {
          data = await this.prisma.award.findMany({
            where: {
              AND: [
                { type: { in: queryType } },
                { poin: { gte: queryPoin[0] } },
                { poin: { lte: queryPoin[1] } },
              ],
            },
          });
        }
      }

      data.forEach((el) => {
        excludeField(el.owner, ['createdAt', 'updateAt', 'role', 'email']);
      });
      return data;
    } catch (error) {
      errorHandler(error);
    }
  }
}
