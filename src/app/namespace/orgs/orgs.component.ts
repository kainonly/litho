import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html'
})
export class OrgsComponent {
  constructor(public app: AppService) {}
}
