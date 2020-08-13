/* tslint:disable:component-class-suffix */
import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BitService, NgxBitModule } from 'ngx-bit';
import { BitDirectiveModule, BitSearchChangeDirective, BitSearchClearDirective } from 'ngx-bit/directive';
import { ListByPage } from 'ngx-bit/factory';
import { switchMap } from 'rxjs/operators';
import { environment } from '../simulation/environment';

describe('BitSearchClearDirective', () => {
  let bit: BitService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let storage: StorageMap;

  beforeEach((done) => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [
          TestComponent
        ],
        imports: [
          FormsModule,
          NzSelectModule,
          BitDirectiveModule,
          RouterModule.forRoot([]),
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      bit = TestBed.inject(BitService);
      storage = TestBed.inject(StorageMap);
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
      setTimeout(() => {
        fixture.detectChanges();
        done();
      }, 500);
    }
  });

  it('Test clear search conditions and persistent directive', (done) => {
    const select = debugElement.query(By.directive(BitSearchChangeDirective));
    select.nativeElement.value = 2;
    select.triggerEventHandler('change', {
      target: select.nativeElement
    });
    expect(component.lists.hasSearch('type')).toBeTruthy();
    expect(component.lists.search.type.value).toEqual('2');
    storage.has('search:test').pipe(
      switchMap(status => {
        expect(status).toBeTruthy();
        return storage.get('search:test');
      }),
      switchMap(data => {
        expect(data).toEqual(component.lists.search);
        const button = debugElement.query(By.directive(BitSearchClearDirective));
        button.triggerEventHandler('click', null);
        return storage.has('search:test');
      })
    ).subscribe(status => {
      expect(status).toBeFalsy();
      setTimeout(() => {
        expect(component.afterResult).toEqual('triggered');
        done();
      }, 200);
    });
  });
});

@Component({
  template: `
    <ng-container *ngIf="lists.hasSearch('type')">
      <select
        [bitSearchChange]="lists"
        [(ngModel)]="lists.search['type'].value"
      >
        <ng-container *ngFor="let option of options">
          <option [label]="option.label" [value]="option.value"></option>
        </ng-container>
      </select>
      <button
        [bitSearchClear]="lists"
        (after)="after()"
      >
        测试清除
      </button>
    </ng-container>
  `
})
class TestComponent implements OnInit {
  lists: ListByPage;
  options: any[] = [
    { label: 'type1', value: 0 },
    { label: 'type1', value: 1 },
    { label: 'type2', value: 2 }
  ];
  afterResult: any;

  constructor(
    private bit: BitService
  ) {
  }

  ngOnInit() {
    this.lists = this.bit.listByPage({
      id: 'test',
      query: [
        { field: 'type', op: '=', value: 0 }
      ]
    });
  }

  after() {
    this.afterResult = 'triggered';
  }
}
