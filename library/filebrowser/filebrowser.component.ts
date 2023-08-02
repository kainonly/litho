import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { AnyDto, Filter, WpxApi, WpxService } from '@weplanx/ng';
import { Transport } from '@weplanx/ng/upload';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FilebrowserDataSource } from './filebrowser.data-source';
import { OPTION } from './provide';
import { Option, WpxFile, WpxFileType } from './types';

@Component({
  selector: 'wpx-filebrowser',
  templateUrl: './filebrowser.component.html',
  styleUrls: ['./filebrowser.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxFilebrowserComponent<T extends WpxFile> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NzCardComponent, { read: ElementRef, static: true }) card!: ElementRef;

  @Input({ required: true }) wpxApi!: WpxApi<T>;
  @Input() wpxType!: WpxFileType;
  @Input() wpxFallback!: string;
  @Input() wpxTitle?: TemplateRef<void>;
  @Input() wpxExtra?: TemplateRef<void>;

  ds!: FilebrowserDataSource<T>;
  actived?: AnyDto<T>;

  private resizeObserver!: ResizeObserver;

  constructor(
    @Inject(OPTION) public option: Option,
    private wpx: WpxService,
    private image: NzImageService,
    private message: NzMessageService,
    private modal: NzModalService,
    private contextMenu: NzContextMenuService
  ) {}

  ngOnInit(): void {
    this.ds = new FilebrowserDataSource<T>(this.wpxApi);
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        const n = width >= 1600 ? 6 : 4;
        if (this.ds.n !== n) {
          this.ds.n = n;
          this.ds.pagesize = n * 10;
          this.ds.fetch(true);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.card.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  upload(data: Transport[]): void {
    const docs: T[] = data.map<T>(
      v =>
        ({
          name: v.name,
          url: Reflect.get(v.file.originFileObj as File, 'key') as string,
          categories: [] as string[]
        }) as T
    );
    this.wpxApi.bulkCreate(docs).subscribe(() => {
      this.ds.fetch(true);
    });
  }

  previewPicture(data: AnyDto<T>): void {
    let url = `${this.wpx.assets}/${data.url}`;
    if (data.query) {
      url += `?${data.query}`;
    }
    this.image.preview([{ src: url, alt: data.name }]);
  }

  previewPoster(data: AnyDto<T>): void {
    this.image.preview(
      [0, 1, 2].map(n => ({
        src: `${this.wpx.assets}/${data.url}_${n}`
      }))
    );
  }

  openActions($event: MouseEvent, menu: NzDropdownMenuComponent, data: AnyDto<T>): void {
    this.actived = data;
    this.contextMenu.create($event, menu);
  }

  openPicture(doc: AnyDto<T>): void {
    // this.modal.create<PictureComponent, ViewPictureData>({
    //   nzTitle: $localize`图片设置`,
    //   nzWidth: 960,
    //   nzContent: PictureComponent,
    //   nzData: {
    //     doc
    //   }
    // });
  }

  openVideo(doc: AnyDto<T>): void {
    // this.modal.create<VideoComponent, ViewVideoData>({
    //   nzTitle: doc.name,
    //   nzWidth: 960,
    //   nzContent: VideoComponent,
    //   nzData: {
    //     url: doc.url
    //   },
    //   nzFooter: null
    // });
  }

  delete(data: AnyDto<T>): void {
    this.modal.confirm({
      nzTitle: `您确认要删除吗?`,
      nzContent: `[${data.name}]`,
      nzWidth: 640,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.wpxApi.delete(data._id).subscribe(() => {
          this.message.success(`数据删除完成`);
          this.ds.fetch(true);
        });
      },
      nzCancelText: `否`
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: `您确认要删除这 ${this.ds.selection.size} 项元素吗?`,
      nzContent: [...this.ds.selection.values()].map(v => `[${v.name}]`).toString(),
      nzWidth: 640,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.wpxApi
          .bulkDelete(
            {
              _id: { $in: [...this.ds.selection.keys()] }
            } as Filter<T>,
            {
              xfilter: {
                '_id->$in': 'oids'
              }
            }
          )
          .subscribe(() => {
            this.ds.selection.clear();
            this.ds.fetch(true);
            this.message.success(`数据删除完成`);
          });
      },
      nzCancelText: `否`
    });
  }
}
