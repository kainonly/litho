import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(public app: AppService) {}
}
