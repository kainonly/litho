import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-resources-home',
  template: ` <nz-result style="padding-top: 27%" nzStatus="info" nzTitle="选择一个资源加载操作控制"> </nz-result> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {}
