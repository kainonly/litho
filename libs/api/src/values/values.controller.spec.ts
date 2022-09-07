import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiModule } from '@weplanx/api';
import * as request from 'supertest';

import configuration from '../../../../config/configuration';
import { ValuesController } from './values.controller';

describe('ValuesController', () => {
  let controller: ValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        ApiModule,
      ],
      controllers: [ValuesController],
    }).compile();

    controller = module.get<ValuesController>(ValuesController);
  });

  it('should be defined', () => {});
});
