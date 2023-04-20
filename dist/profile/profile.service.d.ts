import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileInterface } from './interface';
import { CreateProfileDto, LoginDto } from './dto';
import { Profile } from '@prisma/client';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    checkEmailExists(email: string): Promise<boolean>;
    register(createProfileDto: CreateProfileDto): Promise<ProfileInterface>;
    login(loginDto: LoginDto): Promise<object>;
    findAll(): Promise<Profile[]>;
}
