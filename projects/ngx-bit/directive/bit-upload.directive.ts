import { Directive } from '@angular/core';
import { NzUploadComponent } from 'ng-zorro-antd/upload';
import { BitConfigService } from 'ngx-bit';

@Directive({
  selector: 'nz-upload[bitUpload]'
})
export class BitUploadDirective {
  constructor(
    private config: BitConfigService,
    private nzUploadComponent: NzUploadComponent
  ) {
    nzUploadComponent.nzWithCredentials = config.api.withCredentials;
    nzUploadComponent.nzAction = config.url.api + config.api.upload;
    nzUploadComponent.nzSize = 5120;
    nzUploadComponent.nzShowUploadList = false;
  }
}
