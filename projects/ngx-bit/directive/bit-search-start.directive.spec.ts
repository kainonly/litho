import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BitModule, BitService, ListByPage } from 'ngx-bit';
import { BitDirectiveModule, BitSearchStartDirective } from 'ngx-bit/directive';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '@mock/env';
import { HttpClientModule } from '@angular/common/http';

describe('BitSearchStartDirective', () => {
  let bit: BitService;
  let storage: StorageMap;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
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
    await storage.clear().toPromise();
  });

  it('should not triggered for input(click)', async (done) => {
    fixture.detectChanges();
    await component.lists.ready.toPromise();
    fixture.detectChanges();
    const input = debugElement.query(By.css('input'));
    input.nativeElement.value = 'kain';
    input.triggerEventHandler('input', {
      target: input.nativeElement
    });
    fixture.detectChanges();
    input.triggerEventHandler('click', {
      target: input.nativeElement
    });
    interval(1000).pipe(
      take(3)
    ).subscribe({
      next: (v) => {
        expect(component.triggered).toBeFalsy();
      },
      complete: () => {
        done();
      }
    });
  });

  it('should be triggered for input(keydown.enter)', async () => {
    fixture.detectChanges();
    await component.lists.ready.toPromise();
    fixture.detectChanges();
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
    await component.lists.afterSearch().toPromise();
    expect(component.triggered).toBeTruthy();
    const changeKey = await storage.has('search:test-start').toPromise();
    expect(changeKey).toBeTruthy();
  });

  it('should not triggered for button(keydown.enter)', async (done) => {
    fixture.detectChanges();
    await component.lists.ready.toPromise();
    fixture.detectChanges();
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
    interval(1000).pipe(
      take(3)
    ).subscribe({
      next: (v) => {
        expect(component.triggered).toBeFalsy();
      },
      complete: () => {
        done();
      }
    });
  });

  it('should be triggered for button(click)', async () => {
    fixture.detectChanges();
    await component.lists.ready.toPromise();
    fixture.detectChanges();
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
    await component.lists.afterSearch().toPromise();
    expect(component.triggered).toBeTruthy();
    const changeKey = await storage.has('search:test-start').toPromise();
    expect(changeKey).toBeTruthy();
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
        Search
      </button>
    </ng-container>
  `
})
class TestComponent implements OnInit {
  lists: ListByPage;
  triggered = false;

  constructor(
    private bit: BitService
  ) {
  }

  ngOnInit(): void {
    this.lists = this.bit.listByPage({
      id: 'test-start',
      query: [
        { field: 'username', op: '=', value: '' }
      ]
    });
  }

  after(): void {
    this.triggered = true;
  }
}
