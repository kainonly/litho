// import { ConfigModule } from '@nestjs/config';
// import { Test, TestingModule } from '@nestjs/testing';
// import { ApiModule } from '../api.module';
//
// import configuration from '../../../../config/configuration';
// import { LockerService } from './locker.service';
//
// describe('UtilityService', () => {
//   let service: LockerService;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         ConfigModule.forRoot({
//           isGlobal: true,
//           load: [configuration],
//         }),
//         ApiModule,
//       ],
//       providers: [LockerService],
//     }).compile();
//
//     service = module.get<LockerService>(LockerService);
//   });
// });
