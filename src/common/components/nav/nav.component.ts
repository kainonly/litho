import { Component, Input } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {
  @Input({ required: true }) menu!: string;

  constructor(public app: AppService) {}
}
