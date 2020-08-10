import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { environment } from '@env';
import { BitService, NgxBitModule } from 'ngx-bit';

describe('BitService', () => {
  let bit: BitService;

  beforeEach(() => {
    if (!bit) {
      TestBed.configureTestingModule({
        imports: [
          RouterModule.forRoot([]),
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      bit = TestBed.inject(BitService);
    }
  });
});
