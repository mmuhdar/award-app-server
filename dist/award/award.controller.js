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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwardController = void 0;
const common_1 = require("@nestjs/common");
const award_service_1 = require("./award.service");
const dto_1 = require("./dto");
const decorator_1 = require("../decorator");
let AwardController = class AwardController {
    constructor(awardService) {
        this.awardService = awardService;
    }
    create(createAwardDto) {
        return this.awardService.create(createAwardDto);
    }
    findAll(user) {
        return this.awardService.findAll(user);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAwardDto]),
    __metadata("design:returntype", void 0)
], AwardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AwardController.prototype, "findAll", null);
AwardController = __decorate([
    (0, common_1.Controller)('award'),
    __metadata("design:paramtypes", [award_service_1.AwardService])
], AwardController);
exports.AwardController = AwardController;
//# sourceMappingURL=award.controller.js.map