import { Component } from '@angular/core';

import { ShareModule } from '@common/share.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  standalone: true,
  imports: [ShareModule, NzSpinModule],
  selector: 'app-root',
  template: `
    @defer {
      <router-outlet></router-outlet>
    }
  `
})
export class AppComponent {}
