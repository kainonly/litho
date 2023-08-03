import { Component } from '@angular/core';

import { PicturesService } from '@common/services/pictures.service';

@Component({
  selector: 'app-filebrowser-pictures',
  templateUrl: './pictures.component.html'
})
export class PicturesComponent {
  constructor(public pictures: PicturesService) {}
}
