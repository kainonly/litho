import { HttpClient } from '@angular/common/http';
import { Directive, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';

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
    private nzUploadComponent: NzUploadComponent
  ) {
    if (!this.wpx.upload) {
      throw new Error('上传配置不能为空');
    }
    const { url, size, presignedUrl } = this.wpx.upload;
    this.nzUploadComponent.nzName = 'file';
    this.nzUploadComponent.nzShowUploadList = false;
    this.nzUploadComponent.nzAction = url;
    this.nzUploadComponent.nzSize = size ?? 5120;

    this.nzUploadComponent.nzData = (file: NzUploadFile): Observable<any> =>
      this.http.get<any>(presignedUrl!).pipe(
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
}
