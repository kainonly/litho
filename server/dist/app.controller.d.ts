import { FastifyReply } from 'fastify';
import { AppService } from './app.service';
import { LoginDto } from './dto/login.dto';
export declare class AppController {
    private app;
    constructor(app: AppService);
    index(ip: string): any;
    authLogin(body: LoginDto, res: FastifyReply): Promise<any>;
}
