import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
export declare class AppService {
    private db;
    private jwt;
    constructor(db: PrismaService, jwt: JwtService);
    login(email: string, password: string): Promise<string>;
}
