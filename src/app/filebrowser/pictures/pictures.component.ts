import { Component, OnInit } from '@angular/core';

import { PicturesService } from '@common/services/pictures.service';

@Component({
  selector: 'app-filebrowser-pictures',
  templateUrl: './pictures.component.html'
})
export class PicturesComponent implements OnInit {
  constructor(public pictures: PicturesService) {}

  ngOnInit(): void {}
}
