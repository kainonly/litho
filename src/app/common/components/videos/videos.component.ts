import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Video, VideoTag } from '@common/interfaces/video';
import { VideoTagsService } from '@common/services/video-tags.service';
import { AnyDto, WpxData, XFilter } from '@weplanx/ng';
import { VideosService, WpxMediaComponent, WpxMediaDataSource } from '@weplanx/ng/media';
import { Quick, WpxQuickComponent } from '@weplanx/ng/quick';
import { Transport } from '@weplanx/ng/upload';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, FormData } from './form/form.component';
import { TagFormComponent, TagFormData } from './tag-form/tag-form.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent implements OnInit {
  @ViewChild('uploadRef', { static: true }) uploadRef!: TemplateRef<any>;
  @ViewChild('shopSearchRef', { static: true }) shopSearchRef!: TemplateRef<any>;
  @ViewChild('tagSearchRef', { static: true }) tagSearchRef!: TemplateRef<any>;
  @ViewChild('searchRef', { static: true }) searchRef!: TemplateRef<any>;
  @ViewChild(WpxMediaComponent, { static: true }) mediaRef!: WpxMediaComponent;
  @ViewChild(WpxQuickComponent, { static: true }) tagsRef!: WpxQuickComponent;

  ds!: WpxMediaDataSource;
  searchText = '';

  shop = '64256825b16d000cd6bcfb5d';
  shopItems: any[] = [
    { _id: '64256825b16d000cd6bcfb5d', name: '店铺 A' },
    { _id: '64256836b16d000cd6bcfb5f', name: '店铺 B' },
    { _id: '642569d0b16d000cd6bcfb60', name: '店铺 C' }
  ];

  tagItems: Array<AnyDto<Quick>> = [];
  tagIds: string[] = [];

  constructor(private videos: VideosService, public tags: VideoTagsService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.ds = new WpxMediaDataSource(this.videos);
    this.ds.filter = { shop_id: this.shop };
    this.ds.xfilter = { 'tags.$in': 'oids', shop_id: 'oid' };
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

  shopChange(): void {
    this.getData(true);
    this.getTags();
  }

  upload(data: Transport[]): void {
    const docs: Video[] = data.map(v => ({
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
        this.tagsRef.getData(true);
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
}
