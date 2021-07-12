import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BitModule, BitService, ListByPage } from 'ngx-bit';
import { BitDirectiveModule, BitSearchChangeDirective } from 'ngx-bit/directive';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { StorageMap } from '@ngx-pwa/local-storage';
import { environment } from '@mock/env';
import { HttpClientModule } from '@angular/common/http';

describe('BitSearchChangeDirective', () => {
  let bit: BitService;
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
    bit = TestBed.inject(BitService);
    storage = TestBed.inject(StorageMap);
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('Test search directive in ngModel', async () => {
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
    await component.lists.afterSearch().toPromise();
    expect(component.triggered).toBeTruthy();
    const changeKey = await storage.has('search:test-change').toPromise();
    expect(changeKey).toBeTruthy();
  });
});

@Component({
  template: `
    <ng-container *ngIf="lists.hasSearch('type')">
      <select [bitSearchChange]="lists" [(ngModel)]="lists.search['type'].value" (after)="after()">
        <ng-container *ngFor="let option of options">
          <option [label]="option.label" [value]="option.value"></option>
        </ng-container>
      </select>
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

  constructor(private bit: BitService) {}

  ngOnInit(): void {
    this.lists = this.bit.listByPage({
      id: 'test-change',
      query: [{ field: 'type', op: '=', value: 0 }]
    });
  }

  after(): void {
    this.triggered = true;
  }
}
