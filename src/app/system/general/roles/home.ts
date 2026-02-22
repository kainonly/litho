import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-system-roles-home',
  template: `
    <nz-result style="padding-top: 27%" nzStatus="info" nzTitle="选择一个权限组加载视图权限授权"> </nz-result>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {}
