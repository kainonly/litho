import { Component, OnInit } from '@angular/core';

import { WpxModel } from '@weplanx/ng';
import { WpxFile } from '@weplanx/ng/filebrowser';

@Component({
  selector: 'app-filebrowser-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent implements OnInit {
  model!: WpxModel<WpxFile>;

  constructor() {}

  ngOnInit(): void {}

  getData(refresh = false): void {}
}
