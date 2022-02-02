import { HttpClient } from '@angular/common/http';
import { Directive, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';

import { UploadOption } from '../types';
import { WpxService } from '../wpx.service';

@Directive({
  selector: 'nz-upload[wpxUpload]'
})
export class WpxUploadDirective {
  /**
   * 自定义后缀，默认上传无后缀
   */
  @Input() wpxExt?: string;
  private option!: UploadOption;

  constructor(
    private wpx: WpxService,
    private http: HttpClient,
    private message: NzMessageService,
    private nzUploadComponent: NzUploadComponent
  ) {
    if (!this.wpx.upload) {
      throw new Error('上传配置不能为空');
    }
    this.option = this.wpx.upload;
    this.nzUploadComponent.nzName = 'file';
    this.nzUploadComponent.nzShowUploadList = false;
    this.nzUploadComponent.nzSize = this.option.size ?? 5120;
    this.nzUploadComponent.nzAction = this.option.url;
    this.nzUploadComponent.nzData = (file: NzUploadFile): Observable<any> =>
      this.http.get<any>(this.option.presignedUrl!).pipe(
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
