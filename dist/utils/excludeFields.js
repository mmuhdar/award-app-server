"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeField = void 0;
function excludeField(field, keys) {
    if (!field)
        return null;
    for (const key of keys) {
        delete field[key];
    }
    return field;
}
exports.excludeField = excludeField;
//# sourceMappingURL=excludeFields.js.map