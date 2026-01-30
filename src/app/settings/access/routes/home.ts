import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-routes-home',
  template: ` <nz-result style="padding-top: 27%" nzStatus="info" nzTitle="选择一个路由查看详情"> </nz-result> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {}
