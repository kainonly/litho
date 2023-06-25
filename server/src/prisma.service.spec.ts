import { Test } from '@nestjs/testing';
import { hash } from '@node-rs/argon2';

import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let db: PrismaService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [PrismaService]
    }).compile();
    db = app.get<PrismaService>(PrismaService);
  });

  it('create super user', async () => {
    const password = await hash('pass@VAN1234');
    const r = await db.user.create({
      data: {
        email: 'kainonly@qq.com',
        password,
        metadata: {}
      }
    });
    console.log(r);
  });
});
