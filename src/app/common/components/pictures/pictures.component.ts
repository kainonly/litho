import { Component, Inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';

import { FormComponent, FormData } from '@common/components/pictures/form/form.component';
import { Picture } from '@common/interfaces/picture';
import { PictureTagsService } from '@common/services/picture-tags.service';
import { AnyDto } from '@weplanx/ng';
import { PicturesService, WpxMediaComponent, WpxMediaDataSource } from '@weplanx/ng/media';
import { Tag, WpxTagsComponent } from '@weplanx/ng/tags';
import { Transport } from '@weplanx/ng/upload';
import { NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';

export interface PicturesData {
  height?: string;
}

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html'
})
export class PicturesComponent implements OnInit {
  @ViewChild('uploadRef', { static: true }) uploadRef!: TemplateRef<any>;
  @ViewChild('tagSearchRef', { static: true }) tagSearchRef!: TemplateRef<any>;
  @ViewChild('searchRef', { static: true }) searchRef!: TemplateRef<any>;
  @ViewChild(WpxMediaComponent, { static: true }) mediaRef!: WpxMediaComponent;
  @ViewChild(WpxTagsComponent, { static: true }) tagsRef!: WpxTagsComponent;

  ds!: WpxMediaDataSource;
  searchText = '';

  tagItems: Array<AnyDto<Tag>> = [];
  tagIds: string[] = [];

  constructor(private pictures: PicturesService, public tags: PictureTagsService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.ds = new WpxMediaDataSource(this.pictures);
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

  upload(data: Transport[]): void {
    const docs: Picture[] = data.map(v => ({
      name: v.name,
      url: Reflect.get(v.file.originFileObj!, 'key')
    }));
    this.pictures.bulkCreate(docs).subscribe(v => {
      this.getData(true);
    });
  }

  form = (doc: AnyDto<Picture>): void => {
    this.modal.create<FormComponent, FormData>({
      nzTitle: $localize`编辑`,
      nzContent: FormComponent,
      nzData: {
        doc
      }
    });
  };
}
