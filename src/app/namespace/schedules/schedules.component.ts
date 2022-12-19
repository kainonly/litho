import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html'
})
export class SchedulesComponent {
  constructor(public app: AppService) {}
}
