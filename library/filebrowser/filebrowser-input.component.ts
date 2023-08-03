import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';

import { Any, WpxApi, WpxService } from '@weplanx/ng';
import {
  Option,
  OPTION,
  WpxFile,
  WpxFilebrowserComponent,
  WpxFilebrowserModal,
  WpxFileType
} from '@weplanx/ng/filebrowser';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { VideoComponent } from './video/video.component';

@Component({
  selector: 'wpx-filebrowser-input',
  templateUrl: `./filebrowser-input.component.html`,
  styleUrls: ['./filebrowser-input.component.css']
})
export class WpxFilebroserInputComponent<T extends WpxFile> {
  @ViewChild('footerRef') footerRef!: TemplateRef<Any>;
  @ViewChild('sortRef') sortRef!: TemplateRef<Any>;
  modalRef?: NzModalRef<Any>;

  @Input({ required: true }) wpxValue!: string[];
  @Input({ required: true }) wpxApi!: WpxApi<T>;
  @Input({ required: true }) wpxType!: WpxFileType;
  @Input({ required: true }) wpxFallback!: string;
  @Input() wpxHeight = 640;
  @Input() wpxWidth = 1200;
  @Input() wpxLimit?: number;
  @Output() wpxValueChange = new EventEmitter<string[]>();

  constructor(
    @Inject(OPTION) public option: Option,
    private wpx: WpxService,
    private modal: NzModalService,
    private drawer: NzDrawerService,
    private image: NzImageService
  ) {}

  get instance(): WpxFilebrowserComponent<T> {
    return this.modalRef?.componentInstance;
  }

  view(): void {
    this.modalRef = this.modal.create<WpxFilebrowserComponent<T>, WpxFilebrowserModal<T>>({
      nzClosable: false,
      nzBodyStyle: { height: this.wpxHeight + 'px', padding: '8px 24px 24px' },
      nzWidth: this.wpxWidth,
      nzContent: WpxFilebrowserComponent,
      nzData: {
        api: this.wpxApi,
        type: this.wpxType,
        fallback: this.wpxFallback
      },
      nzFooter: this.footerRef,
      nzOnOk: instance => {
        const urls = [...instance.ds.selection.values()].map(v => `${v.url}${!v.query ? '' : '?' + v.query}`);
        this.wpxValue = [...this.wpxValue, ...urls];
        this.wpxValueChange.emit(this.wpxValue);
      }
    });
  }

  remove(i: number): void {
    this.wpxValue.splice(i, 1);
    this.wpxValueChange.emit(this.wpxValue);
  }

  openSort(): void {
    this.drawer.create({
      nzTitle: '*拖拽图片进行排序',
      nzClosable: false,
      nzWidth: 350,
      nzContent: this.sortRef
    });
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.wpxValue, event.previousIndex, event.currentIndex);
    this.wpxValueChange.emit(this.wpxValue);
  }

  preview(url: string): void {
    this.image.preview([{ src: `${this.wpx.assets}/${url}` }]);
  }

  video(url: string): void {
    this.modal.create<VideoComponent>({
      nzWidth: 960,
      nzClosable: false,
      nzContent: VideoComponent,
      nzData: {
        url
      },
      nzFooter: null
    });
  }
}
