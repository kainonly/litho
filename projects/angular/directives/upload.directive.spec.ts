import { Component, ViewChild } from '@angular/core';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WpxModule, WpxService, WpxShareModule, WpxUploadDirective } from '@weplanx/ng';
import { Observable } from 'rxjs';

@Component({
  template: ` <nz-upload wpxUpload wpxExt="image" nzListType="picture-card"></nz-upload> `
})
class ExampleComponent {
  @ViewChild(NzUploadComponent) nzUpload!: NzUploadComponent;
  @ViewChild(WpxUploadDirective) wpxUpload!: WpxUploadDirective;
}

describe('测试 WpxUploadDirective', () => {
  let wpx: WpxService;
  let httpTestingController: HttpTestingController;
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  it('对象存储预期签名参数', () => {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent],
      imports: [WpxModule, WpxShareModule, HttpClientTestingModule]
    });
    wpx = TestBed.inject(WpxService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    wpx.upload.next({
      type: 'cos',
      url: 'https://xxxxx.cos.ap-guangzhou.myqcloud.com',
      limit: 102400
    });
    wpx.upload.complete();
    expect(component.wpxUpload.wpxExt).toEqual('image');
    expect(component.nzUpload.nzName).toEqual('file');
    expect(component.nzUpload.nzShowUploadList).toBeFalse();
    expect(component.nzUpload.nzSize).toEqual(102400);
    expect(component.nzUpload.nzAction).toEqual('https://xxxxx.cos.ap-guangzhou.myqcloud.com');
    const nzDataFunc = component.nzUpload.nzData as (file: NzUploadFile) => Observable<any>;
    nzDataFunc({
      uid: '123456',
      name: 'hello',
      type: 'image/png'
    }).subscribe(data => {
      expect(data).toEqual({
        'Content-Type': 'image/png',
        key: 'f50c215d-95c2-4564-9b25-37aaba7fb305.image',
        policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
        'q-sign-algorithm': 'sha1',
        'q-ak': 'c2hhb2RhaG9uZw==',
        'q-key-time': '1610462610;1610463210',
        'q-signature': 'ZGFob25nc2hhbw=='
      });
    });
    const req = httpTestingController.expectOne('tencent/cos-presigned');
    expect(req.request.method).toEqual('GET');
    req.flush({
      key: 'f50c215d-95c2-4564-9b25-37aaba7fb305',
      policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
      'q-sign-algorithm': 'sha1',
      'q-ak': 'c2hhb2RhaG9uZw==',
      'q-key-time': '1610462610;1610463210',
      'q-signature': 'ZGFob25nc2hhbw=='
    });
    httpTestingController.verify();
  });
});
