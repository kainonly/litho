import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { environment } from '@env';
import { BitSwalService, NgxBitModule } from 'ngx-bit';

describe('BitSwalService', () => {
  let swal: BitSwalService;

  beforeEach(() => {
    if (!swal) {
      TestBed.configureTestingModule({
        imports: [
          RouterModule.forRoot([]),
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      swal = TestBed.inject(BitSwalService);
    }
  });
});
