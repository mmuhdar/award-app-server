"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const enum_1 = require("./enum");
const utils_1 = require("../utils");
let ProfileService = class ProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkEmailExists(email) {
        try {
            const data = await this.prisma.profile.findUnique({
                where: { email },
            });
            if (!data)
                return false;
            return true;
        }
        catch (error) {
            (0, utils_1.errorHandler)(error);
        }
    }
    async register(createProfileDto) {
        try {
            const { name, email } = createProfileDto;
            const emailExists = await this.checkEmailExists(email);
            if (emailExists)
                throw new common_1.ConflictException('Email already registered');
            const data = await this.prisma.profile.create({
                data: {
                    name,
                    email,
                    role: enum_1.ProfileRole.MEMBER,
                },
            });
            const res = (0, utils_1.excludeField)(data, ['createdAt', 'updateAt']);
            return res;
        }
        catch (error) {
            (0, utils_1.errorHandler)(error);
        }
    }
    async login(loginDto) {
        try {
            const { email } = loginDto;
            const found = await this.prisma.profile.findUnique({
                where: { email },
            });
            if (!found)
                throw new common_1.NotFoundException('Email Address is not exists');
            const tokenPayload = {
                id: found.id,
                email: found.email,
                name: found.name,
                role: found.role,
            };
            const token = await (0, utils_1.createToken)(tokenPayload);
            return {
                name: found.name,
                role: found.role,
                accessToken: token,
            };
        }
        catch (error) {
            (0, utils_1.errorHandler)(error);
        }
    }
    async findAll() {
        try {
            const data = await this.prisma.profile.findMany();
            return data;
        }
        catch (error) {
            (0, utils_1.errorHandler)(error);
        }
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map