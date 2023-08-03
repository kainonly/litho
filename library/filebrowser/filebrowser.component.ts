import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { WpxCategoriesComponent } from '@weplanx/ng/categories';
import { Transport } from '@weplanx/ng/upload';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { CategoriesComponent, CategoriesModal } from './categories/categories.component';
import { FilebrowserDataSource } from './filebrowser.data-source';
import { FormComponent, FormModal } from './form/form.component';
import { PictureComponent } from './picture/picture.component';
import { OPTION } from './provide';
import { Option, WpxFile, WpxFileType } from './types';
import { VideoComponent } from './video/video.component';

@Component({
  selector: 'wpx-filebrowser',
  templateUrl: './filebrowser.component.html',
  styleUrls: ['./filebrowser.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxFilebrowserComponent<T extends WpxFile> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NzCardComponent, { read: ElementRef, static: true }) card!: ElementRef;
  @ViewChild(WpxCategoriesComponent) categories!: WpxCategoriesComponent;

  @Input({ required: true }) wpxApi!: WpxApi<T>;
  @Input({ required: true }) wpxType!: WpxFileType;
  @Input({ required: true }) wpxFallback!: string;
  @Input() wpxMax?: number;
  @Input() wpxForm?: (doc: AnyDto<T>) => void;
  @Input() wpxTitle?: TemplateRef<void>;
  @Input() wpxExtra?: TemplateRef<void>;

  accept: string[] = [];
  ext!: string;

  ds!: FilebrowserDataSource<T>;
  actived?: AnyDto<T>;

  private resizeObserver!: ResizeObserver;

  constructor(
    @Inject(OPTION) public option: Option,
    private wpx: WpxService,
    private image: NzImageService,
    private message: NzMessageService,
    private modal: NzModalService,
    private contextMenu: NzContextMenuService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ds = new FilebrowserDataSource<T>(this.wpxApi);
    switch (this.wpxType) {
      case 'picture':
        this.ext = 'image';
        this.accept = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/webp', 'image/avif'];
        break;
      case 'video':
        this.ext = 'video';
        this.accept = ['video/mp4'];
        break;
    }
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        const n = width >= 1400 ? 6 : 4;
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

  openForm(doc: AnyDto<T>): void {
    if (!this.wpxForm) {
      this.modal.create<FormComponent, FormModal>({
        nzTitle: `编辑`,
        nzContent: FormComponent,
        nzData: {
          doc,
          api: this.wpxApi as WpxApi<WpxFile>,
          categories: this.categories.items
        },
        nzOnOk: () => {
          this.cdr.detectChanges();
        }
      });
    } else {
      this.wpxForm(doc);
    }
  }

  openPicture(doc: AnyDto<T>): void {
    this.modal.create<PictureComponent>({
      nzTitle: `图片设置`,
      nzWidth: 960,
      nzContent: PictureComponent,
      nzData: {
        doc,
        api: this.wpxApi
      },
      nzOnOk: () => {
        this.cdr.detectChanges();
      }
    });
  }

  openVideo(doc: AnyDto<T>): void {
    this.modal.create<VideoComponent>({
      nzTitle: doc.name,
      nzWidth: 960,
      nzContent: VideoComponent,
      nzData: {
        url: doc.url
      },
      nzFooter: null
    });
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
          this.ds.removeSelection(data._id);
          data.deleted = true;
          this.cdr.detectChanges();
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
            this.ds.selection.forEach(value => {
              value.deleted = true;
            });
            this.ds.selection.clear();
            this.cdr.detectChanges();
            this.message.success(`数据删除完成`);
          });
      },
      nzCancelText: `否`
    });
  }

  bulkCategories(): void {
    this.modal.create<CategoriesComponent, CategoriesModal>({
      nzTitle: `编辑`,
      nzContent: CategoriesComponent,
      nzData: {
        docs: [...this.ds.selection.values()] as AnyDto<T>[],
        api: this.wpxApi as WpxApi<WpxFile>,
        categories: this.categories.items
      },
      nzOnOk: () => {
        this.ds.selection.clear();
        this.cdr.detectChanges();
      }
    });
  }
}
