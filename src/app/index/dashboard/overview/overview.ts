import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-index-dashboard-overview',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Overview {}
