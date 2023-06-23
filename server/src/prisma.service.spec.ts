import { Test } from '@nestjs/testing';

import * as argon2 from 'argon2';

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
    const password = await argon2.hash('pass@VAN1234');
    const r = await db.user.create({
      data: {
        email: 'zhangtqx@vip.qq.com',
        password
      }
    });
    console.log(r);
  });
});
