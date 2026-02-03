import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
    imports: [SharedModule],
    selector: 'app-settings-roles-home',
    template: ` <nz-result style="padding-top: 27%" nzStatus="info" nzTitle="选择一个角色查看权限"> </nz-result> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home { }
