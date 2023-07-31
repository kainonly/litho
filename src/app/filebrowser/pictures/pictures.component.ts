import { Component, OnInit } from '@angular/core';

import { PicturesService } from '@common/services/pictures.service';
import { WpxModel, WpxService } from '@weplanx/ng';
import { WpxFile } from '@weplanx/ng/filebrowser';

@Component({
  selector: 'app-filebrowser-pictures',
  templateUrl: './pictures.component.html'
})
export class PicturesComponent implements OnInit {
  model!: WpxModel<WpxFile>;

  constructor(
    private wpx: WpxService,
    private pictures: PicturesService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel<WpxFile>('pictures', this.pictures);
    this.model.ready().subscribe(() => {
      this.getData(true);
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model.fetch().subscribe(() => {
      console.debug('fetch:ok');
    });
  }
}
