import { TestBed } from '@angular/core/testing';
import { BitConfig, BitModule } from 'ngx-bit';
import { environment } from '@mock/env';

describe('BitConfig', () => {
  let config: BitConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BitModule.forRoot(environment.bit)]
    });
    config = TestBed.inject(BitConfig);
  });

  it('Verify configuration correctness', () => {
    expect(config.url).toBe(environment.bit.url);
    expect(config.api).toBe(environment.bit.api);
    expect(config.locale).toBe(environment.bit.locale);
    expect(config.page).toBe(environment.bit.page);
    expect(config.col).toBe(environment.bit.col);
    expect(config.i18n).toBe(environment.bit.i18n);
    expect(config.query).toBe(environment.bit.query);
  });
});
