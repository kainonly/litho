import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzUploadComponent, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { BitConfigService, BitEventsService, BitHttpService, BitService, BitSupportService, BitSwalService } from 'ngx-bit';
import { BitDirectiveModule, BitUploadDirective } from 'ngx-bit/directive';
import { ApiConfig } from 'ngx-bit/types';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../simulation/environment';

describe('BitUploadDirective', () => {
  let config: BitConfigService;
  let httpTestingController: HttpTestingController;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  function before(api: ApiConfig): void {
    const env = environment.bit;
    env.api = api;
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        NzUploadModule,
        BitDirectiveModule,
        HttpClientTestingModule
      ],
      providers: [
        BitService,
        BitHttpService,
        BitEventsService,
        BitSupportService,
        BitSwalService,
        {
          provide: BitConfigService, useFactory: () => {
            const env = environment.bit;
            const service = new BitConfigService();
            Reflect.ownKeys(env).forEach(key => {
              service[key] = env[key];
            });
            return service;
          }
        }
      ]
    });
    config = TestBed.inject(BitConfigService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('Test uploadStorage by default', () => {
    before({
      namespace: '/system',
      withCredentials: true,
      upload: '/system/main/uploads',
      uploadStorage: 'default'
    });
    expect(component.ref.nzSize).toEqual(5120);
    expect(component.ref.nzShowUploadList).toEqual(false);
    expect(component.ref.nzAction).toEqual(config.url.api + config.api.upload);
    expect(component.ref.nzWithCredentials).toEqual(config.api.withCredentials);
  });

  it('Test uploadStorage by oss', () => {
    before({
      namespace: '/system',
      withCredentials: true,
      upload: 'https://center-xxx.oss-cn-shenzhen.aliyuncs.com',
      uploadStorage: 'oss',
      uploadFetchSigned: '/system/main/presigned',
      uploadFetchSignedMethod: 'GET',
      uploadSize: 102400
    });
    expect(component.ref.nzSize).toEqual(102400);
    expect(component.ref.nzShowUploadList).toEqual(false);
    expect(component.ref.nzAction).toEqual(config.api.upload);
    expect(component.ref.nzWithCredentials).toEqual(false);
    const file: NzUploadFile = {
      uid: '1',
      name: 'hello'
    };
    // @ts-ignore
    component.ref.nzData(file).subscribe(res => {
      expect(res).toEqual({
        key: 'f50c215d-95c2-4564-9b25-37aaba7fb305',
        policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
        OSSAccessKeyId: 'c2hhb2RhaG9uZw==',
        Signature: 'ZGFob25nc2hhbw=='
      });
    });
    const req = httpTestingController.expectOne(config.url.api + config.api.uploadFetchSigned);
    expect(req.request.method).toEqual(config.api.uploadFetchSignedMethod);
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
    before({
      namespace: '/system',
      withCredentials: true,
      upload: 'https://cdn-xxx.obs.cn-south-1.myhuaweicloud.com',
      uploadStorage: 'obs',
      uploadFetchSigned: '/system/main/presigned',
      uploadFetchSignedMethod: 'GET',
      uploadSize: 102400
    });
    expect(component.ref.nzSize).toEqual(102400);
    expect(component.ref.nzShowUploadList).toEqual(false);
    expect(component.ref.nzAction).toEqual(config.api.upload);
    expect(component.ref.nzWithCredentials).toEqual(false);
    const file: NzUploadFile = {
      uid: '1',
      name: 'hello.txt'
    };
    // @ts-ignore
    component.ref.nzData(file).subscribe(res => {
      expect(res).toEqual({
        key: 'f50c215d-95c2-4564-9b25-37aaba7fb305.txt',
        policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
        AccessKeyId: 'c2hhb2RhaG9uZw==',
        signature: 'ZGFob25nc2hhbw=='
      });
    });
    const req = httpTestingController.expectOne(config.url.api + config.api.uploadFetchSigned);
    expect(req.request.method).toEqual(config.api.uploadFetchSignedMethod);
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
    before({
      namespace: '/system',
      withCredentials: true,
      upload: 'https://cdn-xxx.cos.ap-guangzhou.myqcloud.com',
      uploadStorage: 'cos',
      uploadFetchSigned: '/system/main/presigned',
      uploadFetchSignedMethod: 'POST',
      uploadSize: 102400
    });
    expect(component.ref.nzSize).toEqual(102400);
    expect(component.ref.nzShowUploadList).toEqual(false);
    expect(component.ref.nzAction).toEqual(config.api.upload);
    expect(component.ref.nzWithCredentials).toEqual(false);
    const file: NzUploadFile = {
      uid: '1',
      name: 'hello.vvv.png'
    };
    // @ts-ignore
    component.ref.nzData(file).subscribe(res => {
      expect(res).toEqual({
        key: 'f50c215d-95c2-4564-9b25-37aaba7fb305.png',
        policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
        'q-sign-algorithm': 'sha1',
        'q-ak': 'c2hhb2RhaG9uZw==',
        'q-key-time': '1610462610;1610463210',
        'q-signature': 'ZGFob25nc2hhbw=='
      });
    });
    const req = httpTestingController.expectOne(config.url.api + config.api.uploadFetchSigned);
    expect(req.request.method).toEqual(config.api.uploadFetchSignedMethod);
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

@Component({
  template: `
    <nz-upload
      #uploadComponent
      bitUpload
      nzListType="picture-card"
    >
    </nz-upload>
  `
})
class TestComponent {
  @ViewChild('uploadComponent') ref: NzUploadComponent;
}
