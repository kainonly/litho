import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-admin-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {
  constructor(public app: AppService) {}
}
