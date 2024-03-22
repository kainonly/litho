import { Component } from '@angular/core';

import { AppService } from '@app';
import { NavComponent } from '@common/components/nav/nav.component';
import { ShareModule } from '@common/share.module';

@Component({
  standalone: true,
  imports: [ShareModule, NavComponent],
  selector: 'app-audit',
  templateUrl: './audit.component.html'
})
export class AuditComponent {
  constructor(public app: AppService) {}
}
