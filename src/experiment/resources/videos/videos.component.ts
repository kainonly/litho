import { Component, OnInit, ViewChild } from '@angular/core';

import { VideoTag } from '@common/interfaces/video';
import { VideoTagsService } from '@common/services/video-tags.service';
import { AnyDto, WpxData, WpxService, XFilter } from '@weplanx/ng';
import { Media, Video, VideosService, WpxMediaViewComponent, WpxMediaViewDataSource } from '@weplanx/ng/media';
import { Tag, WpxTagsComponent } from '@weplanx/ng/tags';
import { Transport } from '@weplanx/ng/upload';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, FormData } from './form/form.component';
import { TagFormComponent, TagFormData } from './tag-form/tag-form.component';

@Component({
  selector: 'app-resources-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  @ViewChild('view') view!: WpxMediaViewComponent;
  @ViewChild('wpxTags') wpxTags!: WpxTagsComponent;

  shop = '64256825b16d000cd6bcfb5d';
  shopItems: any[] = [
    { _id: '64256825b16d000cd6bcfb5d', name: '店铺 A' },
    { _id: '64256836b16d000cd6bcfb5f', name: '店铺 B' },
    { _id: '642569d0b16d000cd6bcfb60', name: '店铺 C' }
  ];

  ds!: WpxMediaViewDataSource;
  searchText = '';
  tagItems: Array<AnyDto<Tag>> = [];
  tagIds: string[] = [];

  constructor(
    public wpx: WpxService,
    private videos: VideosService,
    public tags: VideoTagsService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.ds = new WpxMediaViewDataSource(this.videos);
    this.ds.filter = { shop_id: this.shop };
    this.ds.xfilter = { 'tags.$in': 'oids', shop_id: 'oid' };
    this.getTags();
  }

  shopChange(): void {
    this.getData(true);
    this.getTags();
  }

  getData(refresh = false): void {
    this.ds.filter = { shop_id: this.shop };
    if (this.searchText) {
      this.ds.filter['name'] = { $regex: this.searchText };
    }
    if (this.tagIds.length !== 0) {
      this.ds.filter['tags'] = { $in: this.tagIds };
    }
    this.ds.fetch(refresh);
  }

  getTags(name?: string): void {
    const filter: Record<string, any> = { shop_id: this.shop };
    const xfilter: Record<string, XFilter> = { shop_id: 'oid' };
    if (name) {
      filter['name'] = { $regex: name };
    }
    this.tags.find(filter, { pagesize: 1000, xfilter }).subscribe(data => {
      this.tagItems = [...data];
    });
  }

  clear(): void {
    this.searchText = '';
    this.getData(true);
  }

  tagFilter = (ds: WpxData<AnyDto<VideoTag>>): void => {
    ds.xfilter = { shop_id: 'oid' };
    ds.filter.shop_id = this.shop;
  };

  tagForm = (doc?: AnyDto<VideoTag>): void => {
    this.modal.create<TagFormComponent, TagFormData>({
      nzTitle: !doc ? $localize`新增` : $localize`编辑`,
      nzContent: TagFormComponent,
      nzData: {
        shop_id: this.shop,
        doc: doc,
        api: this.tags
      },
      nzOnOk: () => {
        this.wpxTags.getData(true);
        this.getTags();
      }
    });
  };

  form = (doc: AnyDto<Video>): void => {
    this.modal.create<FormComponent, FormData>({
      nzTitle: $localize`编辑`,
      nzContent: FormComponent,
      nzData: {
        shop_id: this.shop,
        doc
      }
    });
  };

  upload = (data: Transport[]): void => {
    const docs: Media[] = data.map(v => ({
      name: v.name,
      url: Reflect.get(v.file.originFileObj!, 'key'),
      shop_id: this.shop
    }));
    this.videos
      .bulkCreate(docs, {
        xdata: { shop_id: 'oid' }
      })
      .subscribe(v => {
        this.getData(true);
      });
  };
}
