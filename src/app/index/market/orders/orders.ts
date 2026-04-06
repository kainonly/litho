import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-index-market-orders',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Orders {}
