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
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const utils_1 = require("../utils");
let LoggerMiddleware = class LoggerMiddleware {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async use(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');
        const bearer = req.header('authorization');
        if (!bearer)
            throw new common_1.HttpException('Login First', common_1.HttpStatus.UNAUTHORIZED);
        const token = bearer.split(' ')[1];
        try {
            const { id } = await (0, utils_1.verifyToken)(token);
            const user = await this.prisma.profile.findUnique({
                where: { id },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Token Invalid, Please login first');
            }
            else {
                const userPayload = {
                    id: user.id,
                    role: user.role,
                    email: user.email,
                    name: user.name,
                };
                req.user = userPayload;
                next();
            }
        }
        catch (error) {
            next(error);
        }
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map