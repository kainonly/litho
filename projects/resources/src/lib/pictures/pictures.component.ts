import { Component, OnInit } from '@angular/core';

import { Media, MediaService } from '@weplanx/components/media';
import { Transport } from '@weplanx/components/upload';

@Component({
  selector: 'wpx-resources-pictures',
  templateUrl: './pictures.component.html'
})
export class PicturesComponent implements OnInit {
  constructor(private media: MediaService) {}

  ngOnInit(): void {}

  upload(data: Transport[]): void {
    const docs: Media[] = data.map(v => ({
      type: 'picture',
      name: v.name,
      url: Reflect.get(v.file.originFileObj!, 'key')
    }));
    this.media.create({ docs }).subscribe(v => {
      console.log(v);
    });
  }
}
