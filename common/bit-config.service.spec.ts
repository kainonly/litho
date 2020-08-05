import { TestBed } from '@angular/core/testing';
import { BitConfigService } from 'ngx-bit';

describe('BitConfigService', () => {
  let service: BitConfigService;

  beforeEach(() => {
    if (!service) {
      TestBed.configureTestingModule({
        providers: [
          BitConfigService
        ]
      });
      service = TestBed.inject(BitConfigService);
    }
  });

  it('', () => {
  });

});
