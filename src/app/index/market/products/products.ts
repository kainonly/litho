import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-index-market-products',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Products {}
