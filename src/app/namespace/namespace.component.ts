import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-namespace',
  templateUrl: './namespace.component.html',
  styleUrls: ['./namespace.component.scss']
})
export class NamespaceComponent {
  constructor(public app: AppService) {}
}
