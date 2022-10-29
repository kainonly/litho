import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-logsystem',
  templateUrl: './logsystem.component.html'
})
export class LogsystemComponent {
  constructor(public app: AppService) {}
}
