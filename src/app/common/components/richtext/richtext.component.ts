import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  NgZone,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { PicturesComponent, PicturesData } from '@common/components/pictures/pictures.component';
import { VideosComponent } from '@common/components/videos/videos.component';
import { WpxService } from '@weplanx/ng';
import { WpxMediaData } from '@weplanx/ng/media';
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
  @ViewChild(WpxRichtextComponent) richtext!: WpxRichtextComponent;
  @ViewChild('header') header!: TemplateRef<any>;
  @ViewChild('footer') footer!: TemplateRef<any>;

  placeholder = $localize`直接输入正文`;
  value: RichtextData | null = null;
  modalRef?: NzModalRef<PicturesComponent | VideosComponent>;

  onChanged!: (value: any) => void;
  private onTouched!: () => void;

  constructor(private modal: NzModalService, private wpx: WpxService, private zone: NgZone) {}

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(v: RichtextData): void {
    this.value = v;
  }

  get instance(): PicturesComponent | VideosComponent {
    return this.modalRef?.componentInstance as PicturesComponent | VideosComponent;
  }

  openPictures = (done: ResolveDone): void => {
    this.modalRef = this.modal.create<PicturesComponent, WpxMediaData>({
      nzTitle: this.header,
      nzBodyStyle: { background: '#f0f2f5' },
      nzWidth: 1280,
      nzContent: PicturesComponent,
      nzData: {
        type: 'pictures',
        fallback: this.richtext.wpxFallback!,
        height: '600px',
        max: 1,
        footer: this.footer
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
    this.modalRef = this.modal.create<VideosComponent, WpxMediaData>({
      nzTitle: this.header,
      nzBodyStyle: { background: '#f0f2f5' },
      nzWidth: 1280,
      nzContent: VideosComponent,
      nzData: {
        type: 'videos',
        fallback: this.richtext.wpxFallback!,
        height: '600px',
        max: 1,
        footer: this.footer
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
