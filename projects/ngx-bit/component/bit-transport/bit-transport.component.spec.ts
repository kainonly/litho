/* tslint:disable:component-class-suffix */
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitExtModule, BitTransportComponent } from 'ngx-bit/component';
import { NzUploadBtnComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { BitConfigService, BitModule } from 'ngx-bit';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../simulation/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BitTransportComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let httpMock: HttpTestingController;
  let config: BitConfigService;

  const FILECONTENT = [`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`];

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [
          TestComponent
        ],
        imports: [
          NoopAnimationsModule,
          HttpClientModule,
          HttpClientTestingModule,
          BitExtModule,
          RouterModule.forRoot([]),
          BitModule.forRoot(environment.bit)
        ]
      });
      config = TestBed.inject(BitConfigService);
      httpMock = TestBed.inject(HttpTestingController);
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
    }
  });

  it('Test transport action', (done) => {
    const btnEl = debugElement.query(By.directive(NzUploadBtnComponent));
    const btnComp = btnEl.injector.get(NzUploadBtnComponent) as NzUploadBtnComponent;
    const files = [
      new File(FILECONTENT, 'test.png', {
        type: 'image/png'
      })
    ];
    spyOn(btnComp, 'onClick').and.callFake(() => btnComp.onChange({ target: { files } } as any));
    btnEl.nativeElement.click();
    const req = httpMock.expectOne(config.url.api + config.api.upload);
    const ds = component.bitTransportComponent.ds;
    req.event({ type: HttpEventType.UploadProgress, loaded: 0, total: 0 });
    expect(component.files).toBeUndefined();
    expect(component.complete).toBeFalsy();
    ds.complete.subscribe(() => {
      expect(component.files.length).toBe(1);
      expect(component.files[0].name).toEqual('test.png');
      expect(component.complete).toBeTruthy();
      done();
    });
    req.flush({ error: 0, msg: 'ok' });
  });
});

@Component({
  template: `
    <bit-transport
      #bitTransportComponent
      [action]="transport"
      (actionComplete)="transportComplete()"
    ></bit-transport>
  `
})
class TestComponent {
  @ViewChild('bitTransportComponent') bitTransportComponent: BitTransportComponent;
  complete = false;
  files: NzUploadFile[];

  transport = (files: NzUploadFile[]): Observable<any> => {
    this.files = files;
    return of({ error: 0, msg: 'ok' });
  };

  transportComplete(): void {
    this.complete = true;
  }
}


