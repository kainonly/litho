import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, forwardRef, Inject, Input, Optional, TemplateRef, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { WpxMediaType, Option, OPTION, WpxMediaData } from './types';
import { VideoComponent, ViewVideoData } from './video/video.component';

@Component({
  selector: 'wpx-media-input',
  templateUrl: './media-input.component.html',
  styleUrls: ['./media-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxMediaInputComponent),
      multi: true
    }
  ]
})
export class WpxMediaInputComponent implements ControlValueAccessor {
  @Input() wpxType!: WpxMediaType;
  @Input() wpxFallback!: string;
  @Input() wpxLimit?: number;
  @Input() wpxMax?: number;
  @Input() wpxHeader?: TemplateRef<any>;
  @Input() wpxComponent?: Type<any>;
  @Input() wpxFooter?: TemplateRef<any>;

  values?: string[];
  modalRef?: NzModalRef<any>;
  sortVisible = false;

  private onChanged!: (value: any[]) => void;
  private onTouched!: () => void;

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    @Inject(OPTION) public option: Option,
    @Optional() private wpx: WpxService,
    @Optional() private image: NzImageService
  ) {}

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(v: any): void {
    this.values = v ?? [];
  }

  view(): void {
    this.modalRef = this.modal.create<any, WpxMediaData>({
      nzTitle: this.wpxHeader,
      nzBodyStyle: { background: '#f0f2f5' },
      nzWidth: 1280,
      nzContent: this.wpxComponent,
      nzData: {
        type: this.wpxType,
        fallback: this.wpxFallback,
        height: '600px',
        max: this.wpxMax,
        footer: this.wpxFooter
      },
      nzOnOk: instance => {
        this.values = [
          ...this.values!,
          ...instance.ds.getUrls([...instance.ds.checkedIds.values()].splice(0, this.wpxMax))
        ];
        if (this.wpxLimit && this.wpxLimit < this.values.length) {
          this.message.warning($localize`最多允许导入${this.wpxLimit}个元素`);
          this.values = this.values.splice(0, this.wpxLimit);
        }
        this.onChanged(this.values!);
      }
    });
  }

  removeValue(i: number): void {
    this.values!.splice(i, 1);
    this.onChanged(this.values!);
  }

  openSort(): void {
    this.sortVisible = true;
  }

  closeSort(): void {
    this.sortVisible = false;
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.values!, event.previousIndex, event.currentIndex);
    this.onChanged(this.values!);
  }

  preview(url: string): void {
    this.image.preview([{ src: `${this.wpx.assets}/${url}` }]);
  }

  video(url: string): void {
    this.modal.create<VideoComponent, ViewVideoData>({
      nzWidth: 960,
      nzContent: VideoComponent,
      nzData: {
        url
      },
      nzFooter: null
    });
  }
}
