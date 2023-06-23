"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_1 = require("@fastify/cookie");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    const config = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        forbidUnknownValues: true
    }));
    await app.register(cookie_1.default, {
        secret: config.get('KEY')
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}}`);
}
bootstrap();
//# sourceMappingURL=main.js.map