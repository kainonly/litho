import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { FormComponent, InputData } from '@common/components/pictures/form/form.component';
import { TagsComponent } from '@common/components/pictures/tags/tags.component';
import { Picture, PictureTag } from '@common/interfaces/picture';
import { PictureTagsService } from '@common/services/picture-tags.service';
import { AnyDto, Filter } from '@weplanx/ng';
import { PicturesService, WpxMediaComponent, WpxMediaDataSource } from '@weplanx/ng/media';
import { Transport } from '@weplanx/ng/upload';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html'
})
export class PicturesComponent implements OnInit {
  @ViewChild('uploadRef', { static: true }) uploadRef!: TemplateRef<any>;
  @ViewChild('tagSearchRef', { static: true }) tagSearchRef!: TemplateRef<any>;
  @ViewChild('searchRef', { static: true }) searchRef!: TemplateRef<any>;
  @ViewChild(WpxMediaComponent, { static: true }) mediaRef!: WpxMediaComponent;

  ds!: WpxMediaDataSource;
  searchText = '';

  tagItems: Array<AnyDto<PictureTag>> = [];
  tagIds: string[] = [];

  constructor(
    private pictures: PicturesService,
    public tags: PictureTagsService,
    private modal: NzModalService,
    private drawer: NzDrawerService
  ) {}

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

  clear(): void {
    this.searchText = '';
    this.getData(true);
  }

  getTags(name?: string): void {
    const filter: Filter<PictureTag> = {};
    if (name) {
      filter['name'] = { $regex: name };
    }
    this.tags.find(filter, { pagesize: 1000 }).subscribe(data => {
      this.tagItems = [...data];
    });
  }

  openTags(): void {
    this.drawer.create({
      nzWidth: 600,
      nzClosable: false,
      nzContent: TagsComponent
    });
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
    this.modal.create<FormComponent, InputData>({
      nzTitle: $localize`编辑`,
      nzContent: FormComponent,
      nzData: {
        doc
      }
    });
  };
}
