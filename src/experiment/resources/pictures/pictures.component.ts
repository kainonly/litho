import { Component, OnInit, ViewChild } from '@angular/core';

import { PictureTagsService } from '@common/services/picture-tags.service';
import { AnyDto, WpxService } from '@weplanx/ng';
import { Media, PicturesService, WpxMediaViewComponent, WpxMediaViewDataSource } from '@weplanx/ng/media';
import { Tag } from '@weplanx/ng/tags';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, FormData } from './form/form.component';

@Component({
  selector: 'app-resources-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  @ViewChild('view') view!: WpxMediaViewComponent;

  ds!: WpxMediaViewDataSource;
  searchText = '';
  tagItems: Array<AnyDto<Tag>> = [];
  tagIds: string[] = [];

  constructor(
    public wpx: WpxService,
    private pictures: PicturesService,
    public tags: PictureTagsService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.ds = new WpxMediaViewDataSource(this.pictures);
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

  form = (doc: AnyDto<Media>): void => {
    this.modal.create<FormComponent, FormData>({
      nzTitle: $localize`编辑`,
      nzContent: FormComponent,
      nzData: {
        doc,
        pictures: this.pictures
      }
    });
  };
}
