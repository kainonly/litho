import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  constructor(public app: AppService) {}
}
