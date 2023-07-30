import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html'
})
export class AuditComponent {
  constructor(public app: AppService) {}
}
