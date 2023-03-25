import { Directive, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';

import { WpxService } from '../wpx.service';

@Directive({
  selector: 'nz-upload[wpxUpload]'
})
export class WpxUploadDirective {
  @Input() wpxExt?: string;

  constructor(wpx: WpxService, nzUploadComponent: NzUploadComponent) {
    wpx.upload.subscribe(({ type, url, limit }) => {
      nzUploadComponent.nzName = 'file';
      nzUploadComponent.nzShowUploadList = false;
      nzUploadComponent.nzAction = url;
      nzUploadComponent.nzSize = limit ?? 5120;
      switch (type) {
        case 'cos':
          nzUploadComponent.nzData = (file: NzUploadFile): Observable<any> =>
            wpx.cosPresigned().pipe(
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
