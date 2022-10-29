import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html'
})
export class DeveloperComponent {
  constructor(public app: AppService) {}
}
