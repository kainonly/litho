import { Directive } from '@angular/core';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { BitConfigService } from 'ngx-bit';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Directive({
  selector: 'nz-upload[bitUpload]'
})
export class BitUploadDirective {
  constructor(
    config: BitConfigService,
    http: HttpClient,
    nzUploadComponent: NzUploadComponent
  ) {
    nzUploadComponent.nzSize = !config.api.uploadSize ? 5120 : config.api.uploadSize;
    nzUploadComponent.nzShowUploadList = false;
    if (config.api.uploadStorage === 'default') {
      nzUploadComponent.nzAction = config.url.api + config.api.upload;
      nzUploadComponent.nzWithCredentials = config.api.withCredentials;
      return;
    }
    nzUploadComponent.nzAction = config.api.upload;
    nzUploadComponent.nzData = (file: NzUploadFile): Observable<any> => {
      const url = config.url.api + config.api.uploadFetchSigned;
      return http.request(config.api.uploadFetchSignedMethod, url, {
        withCredentials: config.api.withCredentials
      }).pipe(
        map((res: any) => {
          const sep = file.name.split('.');
          const ext = sep.length > 1 ? '.' + sep.pop().toLowerCase() : '';
          file.key = res.filename + ext;
          switch (config.api.uploadStorage) {
            case 'oss':
              return {
                key: file.key,
                policy: res.option.policy,
                OSSAccessKeyId: res.option.access_key_id,
                Signature: res.option.signature
              };
            case 'obs':
              return {
                key: file.key,
                policy: res.option.policy,
                AccessKeyId: res.option.access_key_id,
                signature: res.option.signature
              };
            case 'cos':
              return {
                key: file.key,
                policy: res.option.policy,
                'q-sign-algorithm': res.option.sign_algorithm,
                'q-ak': res.option.ak,
                'q-key-time': res.option.key_time,
                'q-signature': res.option.signature
              };
          }
        })
      );
    };
  }
}
