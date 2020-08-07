import { TestBed } from '@angular/core/testing';
import { environment } from '@env';
import { BitEventsService, NgxBitModule } from 'ngx-bit';

describe('BitEventsService', () => {
  let service: BitEventsService;

  beforeEach(() => {
    if (!service) {
      TestBed.configureTestingModule({
        imports: [
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      service = TestBed.inject(BitEventsService);
    }
  });

  it('Test publish a component event', (done) => {
    service.on('test').subscribe(args => {
      expect(args).not.toBeNull();
      expect(args.name).toBe('kain');
      service.off('test');
      done();
    });
    service.publish('test', {
      name: 'kain'
    });
  });

  it('Test functional destruction', (done) => {
    expect(service.exists('test')).toBe(false);
    service.on('test').subscribe(args => {
      expect(args).not.toBeNull();
      expect(args.name).toBe('kain');
      service.off('test');
      expect(service.exists('test')).toBe(false);
      done();
    });
    expect(service.exists('test')).toBe(true);
    service.publish('test', {
      name: 'kain'
    });
  });

});
