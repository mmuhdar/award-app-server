import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { LoginDto } from './dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    findAll(): Promise<import(".prisma/client").Profile[]>;
}
export declare class AuthController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    create(createProfileDto: CreateProfileDto): Promise<import("./interface").ProfileInterface>;
    login(loginDto: LoginDto): Promise<object>;
}
