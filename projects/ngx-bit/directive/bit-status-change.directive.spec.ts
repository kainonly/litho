import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BitConfigService, NgxBitModule } from 'ngx-bit';
import { BitDirectiveModule, BitStatusChangeDirective } from 'ngx-bit/directive';
import { NzSwitchComponent, NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { environment } from '../simulation/environment';
import { TestService } from '../simulation/test.service';

describe('BitStatusChangeDirective', () => {
  let httpTestingController: HttpTestingController;
  let config: BitConfigService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        FormsModule,
        NzSwitchModule,
        BitDirectiveModule,
        NzNotificationModule,
        NoopAnimationsModule,
        RouterModule.forRoot([]),
        NgxBitModule.forRoot(environment.bit),
        HttpClientTestingModule
      ],
      providers: [
        TestService
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    config = TestBed.inject(BitConfigService);
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('Test status change request binding directive', () => {
    expect(component.ref.nzControl).toBeTruthy();
    const debug = debugElement.query(By.directive(BitStatusChangeDirective));
    const result = {
      error: 0,
      msg: 'ok'
    };
    debug.nativeElement.click();
    const req = httpTestingController.expectOne(config.url.api + '/system/test/edit');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ id: 1, switch: true, status: false });
    req.flush(result);
    httpTestingController.verify();
    expect(component.feedback).toBeUndefined();
  });

  it('Test status change request binding directive with response', () => {
    expect(component.ref.nzControl).toBeTruthy();
    const debug = debugElement.query(By.directive(BitStatusChangeDirective));
    const result = {
      error: 1,
      msg: 'status cannot be changed'
    };
    debug.nativeElement.click();
    const req = httpTestingController.expectOne(config.url.api + '/system/test/edit');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ id: 1, switch: true, status: false });
    req.flush(result);
    httpTestingController.verify();
    expect(component.feedback).toEqual(result);
  });
});

@Component({
  template: `
    <nz-switch
      #switchComponent
      [(ngModel)]="data.status"
      [bitStatusChange]="testService.status(data)"
      [bitControl]="true"
      (response)="statusFeedback($event)"
    >
    </nz-switch>
  `
})
class TestComponent {
  @ViewChild('switchComponent') ref: NzSwitchComponent;
  data: any = {
    id: 1,
    status: true
  };
  feedback: any;

  constructor(
    public testService: TestService
  ) {
  }

  statusFeedback(event) {
    this.feedback = event;
  }
}
