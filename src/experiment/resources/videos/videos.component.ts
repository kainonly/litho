import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VideoTagsService } from '@common/services/video-tags.service';
import { AnyDto, WpxService } from '@weplanx/ng';
import { VideosService, WpxMediaViewComponent, WpxMediaViewDataSource } from '@weplanx/ng/media';
import { Tag } from '@weplanx/ng/tags';

@Component({
  selector: 'app-resources-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  @ViewChild('view') view!: WpxMediaViewComponent;

  ds!: WpxMediaViewDataSource;
  searchText = '';
  tagItems: Array<AnyDto<Tag>> = [];
  tagIds: string[] = [];

  tagform!: FormGroup;

  constructor(
    public wpx: WpxService,
    private videos: VideosService,
    public tags: VideoTagsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tagform = this.fb.group({
      name: [null, [Validators.required]],
      tid: [1]
    });
    this.ds = new WpxMediaViewDataSource(this.videos);
    this.ds.xfilter = { 'tags.$in': 'oids' };
    this.getTags();
  }

  getData(refresh = false): void {
    this.ds.filter = {};
    if (this.searchText) {
      this.ds.filter['name'] = { $regex: this.searchText };
    }
    if (this.tagIds.length !== 0) {
      this.ds.filter['tags'] = { $in: this.tagIds };
    }
    this.ds.fetch(refresh);
  }

  getTags(name?: string): void {
    const filter: Record<string, any> = {};
    if (name) {
      filter['name'] = { $regex: name };
    }
    this.tags.find(filter, { pagesize: 1000 }).subscribe(data => {
      this.tagItems = [...data];
    });
  }

  clear(): void {
    this.searchText = '';
    this.getData(true);
  }
}
