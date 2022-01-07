import { Component, ViewChild } from '@angular/core';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadOption, WpxModule, WpxService, WpxShareModule } from '@weplanx/common';
import { Observable } from 'rxjs';

@Component({
  template: ` <nz-upload wpxUpload nzListType="picture-card"> </nz-upload> `
})
class ExampleComponent {
  @ViewChild(NzUploadComponent) upload!: NzUploadComponent;
}

describe('WpxUploadDirective', () => {
  let wpx: WpxService;
  let httpTestingController: HttpTestingController;
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  function before(option: UploadOption): void {
    TestBed.configureTestingModule({
      declarations: [ExampleComponent],
      imports: [WpxModule, WpxShareModule, HttpClientTestingModule]
    });
    wpx = TestBed.inject(WpxService);
    wpx.setUpload(option);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('Test uploadStorage by default', () => {
    const option: UploadOption = {
      url: 'http://localhost:9000'
    };
    before(option);
    expect(component.upload.nzAction).toEqual(option.url);
    expect(component.upload.nzSize).toEqual(5120);
    expect(component.upload.nzShowUploadList).toEqual(false);
  });

  it('Test uploadStorage by oss', () => {
    const option: UploadOption = {
      url: 'https://center-xxx.oss-cn-shenzhen.aliyuncs.com',
      storage: 'oss',
      fetchSigned: '/api/upload-signed',
      fetchSignedMethod: 'GET',
      size: 102400
    };
    before(option);
    expect(component.upload.nzSize).toEqual(option.size!);
    expect(component.upload.nzAction).toEqual(option.url);
    const nzDataFunc = component.upload.nzData as (file: NzUploadFile) => Observable<any>;
    nzDataFunc({
      uid: '123456',
      name: 'hello'
    }).subscribe(res => {
      expect(res).toEqual({
        key: 'f50c215d-95c2-4564-9b25-37aaba7fb305',
        policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
        OSSAccessKeyId: 'c2hhb2RhaG9uZw==',
        Signature: 'ZGFob25nc2hhbw=='
      });
    });
    const req = httpTestingController.expectOne(option.fetchSigned!);
    expect(req.request.method).toEqual(option.fetchSignedMethod!);
    req.flush({
      filename: 'f50c215d-95c2-4564-9b25-37aaba7fb305',
      option: {
        policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
        access_key_id: 'c2hhb2RhaG9uZw==',
        signature: 'ZGFob25nc2hhbw=='
      }
    });
    httpTestingController.verify();
  });

  it('Test uploadStorage by obs', () => {
    const option: UploadOption = {
      url: 'https://cdn-xxx.obs.cn-south-1.myhuaweicloud.com',
      storage: 'obs',
      fetchSigned: '/api/upload-signed',
      fetchSignedMethod: 'GET',
      size: 102400
    };
    before(option);
    expect(component.upload.nzSize).toEqual(option.size!);
    expect(component.upload.nzAction).toEqual(option.url);
    const nzDataFunc = component.upload.nzData as (file: NzUploadFile) => Observable<any>;
    nzDataFunc({
      uid: '123456',
      name: 'hello.txt'
    }).subscribe(res => {
      expect(res).toEqual({
        key: 'f50c215d-95c2-4564-9b25-37aaba7fb305.txt',
        policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
        AccessKeyId: 'c2hhb2RhaG9uZw==',
        signature: 'ZGFob25nc2hhbw=='
      });
    });
    const req = httpTestingController.expectOne(option.fetchSigned!);
    expect(req.request.method).toEqual(option.fetchSignedMethod!);
    req.flush({
      filename: 'f50c215d-95c2-4564-9b25-37aaba7fb305',
      option: {
        policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
        access_key_id: 'c2hhb2RhaG9uZw==',
        signature: 'ZGFob25nc2hhbw=='
      }
    });
    httpTestingController.verify();
  });

  it('Test uploadStorage by cos', () => {
    const option: UploadOption = {
      url: 'https://cdn-xxx.cos.ap-guangzhou.myqcloud.com',
      storage: 'cos',
      fetchSigned: '/api/upload-signed',
      fetchSignedMethod: 'GET',
      size: 102400
    };
    before(option);
    expect(component.upload.nzSize).toEqual(option.size!);
    expect(component.upload.nzAction).toEqual(option.url);
    const nzDataFunc = component.upload.nzData as (file: NzUploadFile) => Observable<any>;
    nzDataFunc({
      uid: '123456',
      name: 'hello.vvv.png'
    }).subscribe(res => {
      expect(res).toEqual({
        key: 'f50c215d-95c2-4564-9b25-37aaba7fb305.png',
        policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
        'q-sign-algorithm': 'sha1',
        'q-ak': 'c2hhb2RhaG9uZw==',
        'q-key-time': '1610462610;1610463210',
        'q-signature': 'ZGFob25nc2hhbw=='
      });
    });
    const req = httpTestingController.expectOne(option.fetchSigned!);
    expect(req.request.method).toEqual(option.fetchSignedMethod!);
    req.flush({
      filename: 'f50c215d-95c2-4564-9b25-37aaba7fb305',
      option: {
        policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
        sign_algorithm: 'sha1',
        ak: 'c2hhb2RhaG9uZw==',
        key_time: '1610462610;1610463210',
        signature: 'ZGFob25nc2hhbw=='
      }
    });
    httpTestingController.verify();
  });
});
