import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  constructor(public app: AppService) {}
}
