import { Component, DebugElement, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { WpxModule, WpxRetryDirective, WpxShareModule } from '@weplanx/common';
import { NzImageDirective, NzImageModule } from 'ng-zorro-antd/image';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { fromEvent, timeout } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <img
      nz-image
      nzSrc="/unknow.svg"
      wpxRetry
      [wpxRetryCount]="3"
      [wpxDelay]="50"
      alt=""
    />
  `
})
class ExampleComponent {
  @ViewChild(NzImageDirective) nzImage!: NzImageDirective;
  @ViewChild(WpxRetryDirective) wpxRetry!: WpxRetryDirective;
}

describe('测试 WpxRetryDirective', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;
  let httpTestingController: HttpTestingController;
  let debugElement: DebugElement;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [ExampleComponent],
        imports: [WpxModule, WpxShareModule, NzImageModule, HttpClientTestingModule]
      });
      httpTestingController = TestBed.inject(HttpTestingController);
      fixture = TestBed.createComponent(ExampleComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
    }
  });

  it('图片资源重试', done => {
    expect(component.wpxRetry.wpxRetryCount).toEqual(3);
    expect(component.wpxRetry.wpxDelay).toEqual(50);
    debugElement.query(By.directive(NzImageDirective)).triggerEventHandler('error', null);
    setTimeout(() => {
      const req1 = httpTestingController.expectOne(component.nzImage.nzSrc);
      expect(req1.request.method).toEqual('HEAD');
      req1.flush(null, { status: 404, statusText: 'Not Found' });
      setTimeout(() => {
        const req2 = httpTestingController.expectOne(component.nzImage.nzSrc);
        expect(req2.request.method).toEqual('HEAD');
        req2.flush(null, { status: 404, statusText: 'Not Found' });
        setTimeout(() => {
          const req3 = httpTestingController.expectOne(component.nzImage.nzSrc);
          expect(req3.request.method).toEqual('HEAD');
          req3.flush(null, { status: 204, statusText: 'Not Content' });
          httpTestingController.verify();
          done();
        }, 50);
      }, 50);
    }, 100);
  });
});
