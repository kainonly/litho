import { TestBed } from '@angular/core/testing';
import { environment } from '@env';
import { BitConfigService, NgxBitModule } from 'ngx-bit';

describe('BitConfigService', () => {
  let service: BitConfigService;

  beforeEach(() => {
    if (!service) {
      TestBed.configureTestingModule({
        imports: [
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      service = TestBed.inject(BitConfigService);
    }
  });

  it('Verify configuration correctness', () => {
    expect(service.url).toBe(environment.bit.url);
    console.log(service);
  });

});
