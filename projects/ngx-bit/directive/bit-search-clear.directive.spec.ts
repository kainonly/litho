import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BitModule, Bit, ListByPage } from 'ngx-bit';
import { BitDirectiveModule, BitSearchChangeDirective, BitSearchClearDirective } from 'ngx-bit/directive';
import { environment } from '@mock/env';
import { HttpClientModule } from '@angular/common/http';

describe('BitSearchClearDirective', () => {
  let bit: Bit;
  let storage: StorageMap;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        BitDirectiveModule,
        BitModule.forRoot(environment.bit),
        RouterModule.forRoot([])
      ]
    });
    bit = TestBed.inject(Bit);
    storage = TestBed.inject(StorageMap);
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('Test clear search conditions and persistent directive', async () => {
    fixture.detectChanges();
    expect(component.lists).not.toBeNull();
    await component.lists.ready.toPromise();
    fixture.detectChanges();
    const select = debugElement.query(By.directive(BitSearchChangeDirective));
    select.nativeElement.value = 2;
    select.triggerEventHandler('change', {
      target: select.nativeElement
    });
    fixture.detectChanges();
    expect(component.lists.hasSearch('type')).toBeTruthy();
    expect(component.lists.search.type.value).toEqual('2');
    let clearKey = await storage.has('search:test-clear').toPromise();
    expect(clearKey).toBeTruthy();
    const button = debugElement.query(By.directive(BitSearchClearDirective));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.lists.search.type.value).toEqual('');
    await component.lists.clearSearch().toPromise();
    expect(component.triggered).toBeTruthy();
    clearKey = await storage.has('search:test-clear').toPromise();
    expect(clearKey).toBeFalsy();
  });
});

@Component({
  template: `
    <ng-container *ngIf="lists.hasSearch('type')">
      <select [bitSearchChange]="lists" [(ngModel)]="lists.search['type'].value">
        <ng-container *ngFor="let option of options">
          <option [label]="option.label" [value]="option.value"></option>
        </ng-container>
      </select>
      <button [bitSearchClear]="lists" (after)="after()"> Clear </button>
    </ng-container>
  `
})
class TestComponent implements OnInit {
  lists!: ListByPage;
  options: any[] = [
    { label: 'type0', value: 0 },
    { label: 'type1', value: 1 },
    { label: 'type2', value: 2 }
  ];
  triggered = false;

  constructor(private bit: Bit) {}

  ngOnInit(): void {
    this.lists = this.bit.listByPage({
      id: 'test-clear',
      query: [{ field: 'type', op: '=', value: 0 }]
    });
  }

  after(): void {
    this.triggered = true;
  }
}
