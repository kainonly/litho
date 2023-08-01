import { Component, OnInit } from '@angular/core';

import { Picture } from '@common/models/picture';
import { PicturesService } from '@common/services/pictures.service';
import { WpxModel, WpxService } from '@weplanx/ng';
import { WpxFile } from '@weplanx/ng/filebrowser';
import { Transport } from '@weplanx/ng/upload';

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

  upload(data: Transport[]): void {
    const docs: Picture[] = data.map(v => ({
      name: v.name,
      url: Reflect.get(v.file.originFileObj as File, 'key'),
      categories: []
    }));
    this.pictures.bulkCreate(docs).subscribe(() => {
      this.getData(true);
    });
  }
}
