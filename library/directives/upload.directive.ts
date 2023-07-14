import { Directive, Input } from '@angular/core';

import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';

import { WpxService } from '../wpx.service';

@Directive({
  selector: 'nz-upload[wpxUpload]'
})
export class WpxUploadDirective {
  @Input() wpxExt?: string;

  constructor(wpx: WpxService, component: NzUploadComponent) {
    // wpx.upload.subscribe(option => {
    //   component.nzName = 'file';
    //   component.nzShowUploadList = false;
    //   component.nzAction = option.url;
    //   component.nzSize = option.limit ?? 5120;
    //   switch (option.type) {
    //     case 'cos':
    //       component.nzData = (file: NzUploadFile): Observable<any> =>
    //         wpx.cosPresigned().pipe(
    //           map(v => {
    //             v['Content-Type'] = file.type;
    //             file['key'] = v.key;
    //             if (this.wpxExt) {
    //               v.key = `${v.key}.${this.wpxExt}`;
    //             }
    //             return v;
    //           })
    //         );
    //   }
    // });
  }
}
