import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { PicturesService } from '@common/services/pictures.service';
import { WpxService } from '@weplanx/ng';
import { NzCardComponent } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-filebrowser-pictures',
  templateUrl: './pictures.component.html'
})
export class PicturesComponent implements OnInit {
  constructor(
    private wpx: WpxService,
    public pictures: PicturesService
  ) {}

  ngOnInit(): void {}
}
