"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.IS_PUBLIC_KEY = exports.Active = void 0;
const common_1 = require("@nestjs/common");
exports.Active = (0, common_1.createParamDecorator)((data, ctx) => ctx.switchToHttp().getRequest().user);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
//# sourceMappingURL=app.decorator.js.map