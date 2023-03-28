import { Component } from '@angular/core';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-resources-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent {
  constructor(public wpx: WpxService) {}
}
