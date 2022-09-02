import { HttpClient } from '@angular/common/http';
import { Directive, Input, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';

import { TencentService } from '../tencent.service';
import { WpxService } from '../wpx.service';

@Directive({
  selector: 'nz-upload[wpxUpload]'
})
export class WpxUploadDirective {
  /**
   * 自定义后缀，默认上传无后缀
   */
  @Input() wpxExt?: string;

  constructor(
    private wpx: WpxService,
    private http: HttpClient,
    private message: NzMessageService,
    private nzUploadComponent: NzUploadComponent,
    @Optional() private tencent: TencentService
  ) {
    wpx.upload.subscribe(({ type, url, limit }) => {
      nzUploadComponent.nzName = 'file';
      nzUploadComponent.nzShowUploadList = false;
      nzUploadComponent.nzAction = url;
      nzUploadComponent.nzSize = limit ?? 5120;
      switch (type) {
        case 'cos':
          nzUploadComponent.nzData = (file: NzUploadFile): Observable<any> =>
            tencent.cosPresigned().pipe(
              map(v => {
                v['Content-Type'] = file.type;
                Reflect.set(file, 'key', v.key);
                if (this.wpxExt) {
                  v.key = `${v.key}.${this.wpxExt}`;
                }
                return v;
              })
            );
      }
    });
  }
}
