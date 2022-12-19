import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html'
})
export class MediaComponent {
  constructor(public app: AppService) {}
}
