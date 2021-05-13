import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BitConfigService, BitEventsService, BitHttpService, BitService, BitSupportService, BitSwalService, ListByPage } from 'ngx-bit';
import { BitDirectiveModule, BitSearchStartDirective } from 'ngx-bit/directive';
import { environment } from '../simulation/environment';

describe('BitSearchStartDirective', () => {
  let bit: BitService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let storage: StorageMap;

  beforeEach((done) => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        FormsModule,
        BitDirectiveModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })
      ],
      providers: [
        BitService,
        BitHttpService,
        BitEventsService,
        BitSupportService,
        BitSwalService,
        {
          provide: BitConfigService, useFactory: () => {
            const env = environment.bit;
            const service = new BitConfigService();
            Reflect.ownKeys(env).forEach(key => {
              service[key] = env[key];
            });
            return service;
          }
        }
      ]
    });
    bit = TestBed.inject(BitService);
    storage = TestBed.inject(StorageMap);
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    storage.clear().subscribe(() => {
      setTimeout(() => {
        fixture.detectChanges();
        done();
      }, 500);
    });
  });

  it('should not triggered for input(click)', (done) => {
    const input = debugElement.query(By.css('input'));
    input.nativeElement.value = 'kain';
    input.triggerEventHandler('input', {
      target: input.nativeElement
    });
    fixture.detectChanges();
    input.triggerEventHandler('click', {
      target: input.nativeElement
    });
    setTimeout(() => {
      expect(component.afterResult).toBeUndefined();
      done();
    }, 200);
  });

  it('should be triggered for input(keydown.enter)', (done) => {
    const input = debugElement.query(By.css('input'));
    input.nativeElement.value = 'kain';
    input.triggerEventHandler('input', {
      target: input.nativeElement
    });
    fixture.detectChanges();
    input.triggerEventHandler('keydown.enter', {
      target: input.nativeElement
    });
    expect(component.lists.hasSearch('username')).toBeTruthy();
    expect(component.lists.search.username.value).toEqual('kain');
    setTimeout(() => {
      expect(component.afterResult).toEqual('triggered');
      done();
    }, 200);
  });

  it('should not triggered for button(keydown.enter)', (done) => {
    const input = debugElement.query(By.css('input'));
    input.nativeElement.value = 'bit';
    input.triggerEventHandler('input', {
      target: input.nativeElement
    });
    fixture.detectChanges();
    const button = debugElement.query(By.css('button'));
    button.triggerEventHandler('keydown.enter', {
      target: button.nativeElement
    });
    setTimeout(() => {
      expect(component.afterResult).toBeUndefined();
      done();
    }, 200);
  });

  it('should be triggered for button(click)', (done) => {
    const input = debugElement.query(By.css('input'));
    input.nativeElement.value = 'bit';
    input.triggerEventHandler('input', {
      target: input.nativeElement
    });
    fixture.detectChanges();
    const button = debugElement.query(By.css('button'));
    button.triggerEventHandler('click', {
      target: button.nativeElement
    });
    expect(component.lists.hasSearch('username')).toBeTruthy();
    expect(component.lists.search.username.value).toEqual('bit');
    setTimeout(() => {
      expect(component.afterResult).toEqual('triggered');
      done();
    }, 200);
  });
});

@Component({
  template: `
    <ng-container *ngIf="lists.hasSearch('username')">
      <input
        [bitSearchStart]="lists"
        [(ngModel)]="lists.search['username'].value"
        (after)="after()"
      />
      <button
        [bitSearchStart]="lists"
        (after)="after()"
      >
        搜索
      </button>
    </ng-container>
  `
})
class TestComponent implements OnInit {
  lists: ListByPage;
  afterResult: any;

  constructor(
    private bit: BitService
  ) {
  }

  ngOnInit(): void {
    this.lists = this.bit.listByPage({
      id: 'test',
      query: [
        { field: 'username', op: '=', value: '' }
      ]
    });
  }

  after(): void {
    this.afterResult = 'triggered';
  }
}
