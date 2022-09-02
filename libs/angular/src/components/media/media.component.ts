import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, forwardRef, Input, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { MediaType } from '../../types';
import { VideoComponent } from './view/video/video.component';
import { WpxMediaViewComponent } from './view/view.component';

@Component({
  selector: 'wpx-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxMediaComponent),
      multi: true
    }
  ]
})
export class WpxMediaComponent implements ControlValueAccessor {
  @Input() wpxType!: MediaType;
  @Input() wpxFallback!: string;
  @Input() wpxLimit?: number;
  @Input() wpxMax?: number;

  values?: string[];

  sortVisible = false;

  private onChanged!: (value: any[]) => void;
  private onTouched!: () => void;

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
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

  /**
   * 开启媒体库
   */
  view(): void {
    this.modal.create({
      nzBodyStyle: { background: '#f0f2f5' },
      nzWidth: 960,
      nzContent: WpxMediaViewComponent,
      nzComponentParams: {
        wpxType: this.wpxType,
        wpxFallback: this.wpxFallback,
        wpxHeight: '600px',
        wpxMax: this.wpxMax
      },
      nzOnOk: instance => {
        this.values = [
          ...this.values!,
          ...instance.ds.getUrls([...instance.ds.checkedIds.values()].splice(0, this.wpxMax))
        ];
        if (this.wpxLimit && this.wpxLimit < this.values.length) {
          this.message.warning(`最多允许导入${this.wpxLimit}个元素`);
          this.values = this.values.splice(0, this.wpxLimit);
        }
        this.onChanged(this.values!);
      }
    });
  }

  /**
   * 移除媒体
   * @param i
   */
  removeValue(i: number): void {
    this.values!.splice(i, 1);
    this.onChanged(this.values!);
  }

  /**
   * 开启排序
   */
  openSort(): void {
    this.sortVisible = true;
  }

  /**
   * 关闭排序
   */
  closeSort(): void {
    this.sortVisible = false;
  }

  /**
   * 排序
   * @param event
   */
  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.values!, event.previousIndex, event.currentIndex);
    this.onChanged(this.values!);
  }

  /**
   * 预览图片
   * @param url
   */
  preview(url: string): void {
    this.image.preview([
      {
        src: `${this.wpx.assets}/${url}`
      }
    ]);
  }

  /**
   * 查看视频
   * @param url
   */
  video(url: string): void {
    this.modal.create({
      nzWidth: 960,
      nzContent: VideoComponent,
      nzComponentParams: {
        url
      },
      nzFooter: null
    });
  }
}
