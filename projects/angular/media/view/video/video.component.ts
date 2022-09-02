import { Component, Input } from '@angular/core';

@Component({
  selector: 'wpx-media-view-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  @Input() url!: string;
}
