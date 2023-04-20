"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const errorHandler = (err) => {
    var _a;
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                const key = (_a = err.meta) === null || _a === void 0 ? void 0 : _a.target;
                throw new common_1.ConflictException(`${key} already used`);
            default:
                throw new common_1.InternalServerErrorException();
        }
    }
    else {
        throw err;
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map