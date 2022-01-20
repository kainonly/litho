import { Component, Input, OnInit } from '@angular/core';

import { AnyDto, Dataset } from '@weplanx/common';

import { MediaDataSource } from './media.data-source';
import { MediaService } from './media.service';
import { Media } from './types';

@Component({
  selector: 'wpx-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class WpxMediaComponent implements OnInit {
  @Input() type!: string;

  ds: MediaDataSource = new MediaDataSource();

  constructor(private media: MediaService) {}

  ngOnInit(): void {
    this.getData();
    this.ds.fetch$.subscribe(() => {
      console.log('ok');
      this.getData();
    });
  }

  getData(): void {
    this.ds.from(this.media).subscribe(v => {});
  }
}
