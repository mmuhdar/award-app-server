import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileRole } from './enum';
import { ProfileInterface } from './interface';
import { CreateProfileDto, LoginDto } from './dto';
import { createToken, errorHandler, excludeField } from 'src/utils';
import { Profile } from '@prisma/client';
import { TokenPayload } from './interface/token-payload.interface';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const data = await this.prisma.profile.findUnique({
        where: { email },
      });
      if (!data) return false;
      return true;
    } catch (error) {
      errorHandler(error);
    }
  }

  async register(
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileInterface> {
    try {
      const { name, email } = createProfileDto;
      const emailExists = await this.checkEmailExists(email);
      if (emailExists) throw new ConflictException('Email already registered');
      const data = await this.prisma.profile.create({
        data: {
          name,
          email,
          role: ProfileRole.MEMBER,
        },
      });
      const res = excludeField(data, ['createdAt', 'updateAt']);
      return res;
    } catch (error) {
      errorHandler(error);
    }
  }

  async login(loginDto: LoginDto): Promise<object> {
    try {
      const { email } = loginDto;
      const found = await this.prisma.profile.findUnique({
        where: { email },
      });
      if (!found) throw new NotFoundException('Email Address is not exists');
      const tokenPayload: TokenPayload = {
        id: found.id,
        email: found.email,
        name: found.name,
        role: found.role,
      };
      const token = await createToken(tokenPayload);
      return {
        name: found.name,
        role: found.role,
        accessToken: token,
      };
    } catch (error) {
      errorHandler(error);
    }
  }

  async findAll(): Promise<Profile[]> {
    try {
      const data = await this.prisma.profile.findMany();
      return data;
    } catch (error) {
      errorHandler(error);
    }
  }
}
