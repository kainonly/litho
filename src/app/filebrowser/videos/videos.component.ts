import { Component, OnInit } from '@angular/core';

import { VideosService } from '@common/services/videos.service';

@Component({
  selector: 'app-filebrowser-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent implements OnInit {
  constructor(public videos: VideosService) {}

  ngOnInit(): void {}
}
