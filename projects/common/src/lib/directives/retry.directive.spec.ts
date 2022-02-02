import { Component, DebugElement, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WpxModule, WpxRetryDirective, WpxShareModule } from '@weplanx/common';
import { NzImageModule } from 'ng-zorro-antd/image';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fromEvent, timeout } from 'rxjs';

@Component({
  template: ` <img #ref nz-image wpxRetry [wpxRetryCount]="2" [wpxDelay]="500" nzSrc="/unkonw" alt="" /> `
})
class ExampleComponent {
  @ViewChild('ref') ref!: ElementRef;
  @ViewChild(WpxRetryDirective) wpxRetry!: WpxRetryDirective;
}

describe('测试 WpxRetryDirective', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [ExampleComponent],
        imports: [WpxModule, WpxShareModule, NzImageModule, HttpClientTestingModule]
      });
      fixture = TestBed.createComponent(ExampleComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
    }
  });

  it('图片资源重试', done => {
    expect(component.wpxRetry.wpxRetryCount).toEqual(2);
    expect(component.wpxRetry.wpxDelay).toEqual(500);
    setTimeout(() => {
      done();
    }, 3000);
  });
});
