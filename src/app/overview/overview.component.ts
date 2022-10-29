import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent {
  constructor(public app: AppService) {}
}
