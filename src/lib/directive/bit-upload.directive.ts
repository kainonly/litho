import {Directive} from '@angular/core';
import {NzUploadComponent} from 'ng-zorro-antd';
import {ConfigService} from '../base/config.service';
import {BitService} from '../base/bit.service';

@Directive({
  selector: '[bitUpload]'
})
export class BitUploadDirective {
  constructor(
    private bit: BitService,
    private config: ConfigService,
    private nzUploadComponent: NzUploadComponent
  ) {
    nzUploadComponent.nzWithCredentials = config.withCredentials;
    nzUploadComponent.nzAction = bit.uploads;
    nzUploadComponent.nzSize = 5120;
    nzUploadComponent.nzShowUploadList = false;
  }
}
