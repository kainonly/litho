import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';

import { WpxService } from '../wpx.service';

@Directive({
  selector: 'nz-upload[wpxUpload]'
})
export class WpxUploadDirective {
  constructor(
    private wpx: WpxService,
    private http: HttpClient,
    private message: NzMessageService,
    private nzUploadComponent: NzUploadComponent
  ) {
    if (!wpx.upload) {
      throw new Error('上传配置不能为空');
    }
    const option = wpx.upload;
    nzUploadComponent.nzName = 'file';
    nzUploadComponent.nzShowUploadList = false;
    nzUploadComponent.nzSize = option.size ?? 5120;
    nzUploadComponent.nzAction = option.url;
    nzUploadComponent.nzData = (file: NzUploadFile): Observable<any> =>
      http.get<any>(option.presignedUrl!).pipe(
        map(v => {
          Reflect.set(file, 'key', v.key);
          return v;
        })
      );
  }
}
