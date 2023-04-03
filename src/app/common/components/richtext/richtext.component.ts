import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { MediaType, WpxMediaViewComponent } from '@weplanx/ng/media';
import { ResolveDone, RichtextData, WpxRichtextComponent } from '@weplanx/ng/richtext';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-richtext',
  templateUrl: './richtext.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichtextComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichtextComponent implements ControlValueAccessor {
  @ViewChild('richtext') richtext!: WpxRichtextComponent;
  @ViewChild('searchRef') searchRef!: TemplateRef<any>;

  placeholder = $localize`直接输入正文`;
  value: RichtextData | null = null;
  modalRef?: NzModalRef<WpxMediaViewComponent>;

  onChanged!: (value: any) => void;
  private onTouched!: () => void;

  constructor(private modal: NzModalService, private wpx: WpxService) {}

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(v: RichtextData): void {
    this.value = v;
  }

  openPictures = (done: ResolveDone): void => {
    this.modalRef = this.modal.create({
      nzTitle: this.searchRef,
      nzBodyStyle: { background: '#f0f2f5' },
      nzWidth: 1280,
      nzContent: WpxMediaViewComponent,
      nzComponentParams: {
        wpxType: 'pictures',
        wpxFallback: this.richtext.wpxFallback,
        wpxHeight: '600px',
        wpxMax: 1
      },
      nzOnOk: instance => {
        const data = instance.ds.getValue([...instance.ds.checkedIds.values()][0]);
        let url = data.url;
        if (data.query) {
          url += `?${data.query}`;
        }
        done({
          assets: this.wpx.assets,
          url
        });
      }
    });
  };

  openVideos = (done: ResolveDone): void => {
    this.modalRef = this.modal.create({
      nzTitle: this.searchRef,
      nzBodyStyle: { background: '#f0f2f5' },
      nzWidth: 1280,
      nzContent: WpxMediaViewComponent,
      nzComponentParams: {
        wpxType: 'videos',
        wpxFallback: this.richtext.wpxFallback,
        wpxHeight: '600px',
        wpxMax: 1
      },
      nzOnOk: instance => {
        const data = instance.ds.getValue([...instance.ds.checkedIds.values()][0]);
        done({
          assets: this.wpx.assets,
          url: data.url
        });
      }
    });
  };
}
