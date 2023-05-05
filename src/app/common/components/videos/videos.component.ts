import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { TagsComponent } from '@common/components/videos/tags/tags.component';
import { Video, VideoTag } from '@common/interfaces/video';
import { VideoTagsService } from '@common/services/video-tags.service';
import { AnyDto, XFilter } from '@weplanx/ng';
import { VideosService, WpxMediaComponent, WpxMediaDataSource } from '@weplanx/ng/media';
import { Transport } from '@weplanx/ng/upload';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, InputData } from './form/form.component';

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

  ds!: WpxMediaDataSource;
  searchText = '';

  shop = '64256825b16d000cd6bcfb5d';
  shopItems: any[] = [
    { _id: '64256825b16d000cd6bcfb5d', name: '店铺 A' },
    { _id: '64256836b16d000cd6bcfb5f', name: '店铺 B' },
    { _id: '642569d0b16d000cd6bcfb60', name: '店铺 C' }
  ];

  tagItems: Array<AnyDto<VideoTag>> = [];
  tagIds: string[] = [];

  constructor(
    private videos: VideosService,
    public tags: VideoTagsService,
    private modal: NzModalService,
    private drawer: NzDrawerService
  ) {}

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

  clear(): void {
    this.searchText = '';
    this.getData(true);
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

  openTags(): void {
    this.drawer.create({
      nzWidth: 600,
      nzClosable: false,
      nzContent: TagsComponent
    });
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

  form = (doc: AnyDto<Video>): void => {
    this.modal.create<FormComponent, InputData>({
      nzTitle: $localize`编辑`,
      nzContent: FormComponent,
      nzData: {
        shop_id: this.shop,
        doc
      }
    });
  };
}
