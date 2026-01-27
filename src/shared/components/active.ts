import { Component, input } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  standalone: true,
  imports: [NzBadgeModule],
  selector: 'app-active',
  template: `
    <nz-badge
      [nzStatus]="appValue() ? 'processing' : 'default'"
      [nzText]="appValue() ? appLabel()[0] : appLabel()[1]"
    ></nz-badge>
  `
})
export class Active {
  appValue = input.required<boolean>();
  appLabel = input<string[]>(['启用', '禁用']);
}
