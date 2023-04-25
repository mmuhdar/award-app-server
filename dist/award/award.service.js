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
exports.AwardService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const prisma_service_1 = require("../prisma/prisma.service");
let AwardService = class AwardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAwardDto) {
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
        }
        catch (error) {
            (0, utils_1.errorHandler)(error);
        }
    }
    async findAll(user) {
        try {
            const { id } = user;
            const data = await this.prisma.award.findMany({
                where: { profileId: id },
                include: { owner: true },
            });
            data.forEach((el) => {
                (0, utils_1.excludeField)(el.owner, ['createdAt', 'updateAt', 'role', 'email']);
            });
            return data;
        }
        catch (error) {
            (0, utils_1.errorHandler)(error);
        }
    }
};
AwardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AwardService);
exports.AwardService = AwardService;
//# sourceMappingURL=award.service.js.map