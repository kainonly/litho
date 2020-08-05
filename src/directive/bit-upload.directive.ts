import { Directive } from '@angular/core';
import { NzUploadComponent } from 'ng-zorro-antd';
import { BitConfigService } from '../common/bit-config.service';

@Directive({
  selector: '[bitUpload]'
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
