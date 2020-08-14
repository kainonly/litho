import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BitService, NgxBitModule } from 'ngx-bit';
import { BitDirectiveModule, BitSearchStartDirective } from 'ngx-bit/directive';
import { ListByPage } from 'ngx-bit/factory';
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
    storage.clear().subscribe(() => {
      setTimeout(() => {
        fixture.detectChanges();
        done();
      }, 500);
    });
  });

  it('Test search directive for input', (done) => {
    const input = debugElement.query(By.css('input'));
    input.nativeElement.value = 'kain';
    input.triggerEventHandler('input', {
      target: input.nativeElement
    });
    fixture.detectChanges();
    input.triggerEventHandler('keydown.enter', null);
    expect(component.lists.hasSearch('username')).toBeTruthy();
    expect(component.lists.search.username.value).toEqual('kain');
    setTimeout(() => {
      expect(component.afterResult).toEqual('triggered');
      done();
    }, 200);
  });

  it('Test search directive for button', (done) => {
    const input = debugElement.query(By.css('input'));
    input.nativeElement.value = 'van';
    input.triggerEventHandler('input', {
      target: input.nativeElement
    });
    fixture.detectChanges();
    const button = debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(component.lists.hasSearch('username')).toBeTruthy();
    expect(component.lists.search.username.value).toEqual('van');
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

  ngOnInit() {
    this.lists = this.bit.listByPage({
      id: 'test',
      query: [
        { field: 'username', op: '=', value: '' }
      ]
    });
  }

  after() {
    this.afterResult = 'triggered';
  }
}
