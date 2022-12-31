import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html'
})
export class CenterComponent {
  constructor(public app: AppService) {}
}
