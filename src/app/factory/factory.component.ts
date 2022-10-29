import { Component } from '@angular/core';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html'
})
export class FactoryComponent {
  constructor(public wpx: WpxService) {}
}
