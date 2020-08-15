import { TestBed } from '@angular/core/testing';
import { environment } from '../simulation/environment';
import { BitEventsService, NgxBitModule } from 'ngx-bit';

describe('BitEventsService', () => {
  let events: BitEventsService;

  beforeEach(() => {
    if (!events) {
      TestBed.configureTestingModule({
        imports: [
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      events = TestBed.inject(BitEventsService);
    }
  });

  it('Test publish a component event', (done) => {
    events.on('test').subscribe(args => {
      expect(args).not.toBeNull();
      expect(args.name).toBe('kain');
      events.off('test');
      done();
    });
    events.publish('test', {
      name: 'kain'
    });
  });

  it('Test functional destruction', (done) => {
    expect(events.exists('test')).toBe(false);
    events.on('test').subscribe(args => {
      expect(args).not.toBeNull();
      expect(args.name).toBe('kain');
      events.off('test');
      expect(events.exists('test')).toBe(false);
      done();
    });
    expect(events.exists('test')).toBe(true);
    events.publish('test', {
      name: 'kain'
    });
  });

});
