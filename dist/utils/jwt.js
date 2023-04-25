"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const createToken = async (payload) => {
    try {
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '3h',
        });
        return token;
    }
    catch (error) {
        throw new common_1.InternalServerErrorException(error.message);
    }
};
exports.createToken = createToken;
const verifyToken = async (token) => {
    const data = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            switch (err.name) {
                case 'TokenExpiredError':
                    throw new common_1.UnauthorizedException('Token has expired, please Re-login');
                case 'JsonWebTokenError':
                    throw new common_1.UnauthorizedException('Invalid Token');
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        else {
            return decoded;
        }
    });
    return data;
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map