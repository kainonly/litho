import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { from } from 'rxjs';

import { WpxService } from '@weplanx/common';
import { MediaType, WpxMediaViewComponent } from '@weplanx/components/media';
import { NzModalService } from 'ng-zorro-antd/modal';

import { defaultTools, zh_CN } from './helper';
import { Image } from './image';
import { WpxRichtextService } from './richtext.service';
import { ResolveDone } from './types';
import { Video } from './video';

let windowAny: any = window;

@Component({
  selector: 'wpx-richtext',
  exportAs: 'wpxRichtext',
  templateUrl: './richtext.component.html',
  styleUrls: ['./richtext.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxRichtextComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxRichtextComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() wpxPlaceholder?: string;
  @Input() wpxFallback?: string;

  title = '';
  loading = true;
  private value?: any;
  private instance?: any;
  private onChange?: (value: any) => void;
  private onTouched?: () => void;

  @ViewChild('article') article!: ElementRef;

  constructor(
    private platform: Platform,
    private cd: ChangeDetectorRef,
    private wpx: WpxService,
    private richtext: WpxRichtextService,
    private modal: NzModalService
  ) {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value ?? {};
  }

  ngAfterViewInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    if (window.hasOwnProperty('EditorJS')) {
      this.initialize();
      return;
    }
    this.richtext.loadScript().subscribe(() => {
      this.initialize();
    });
  }

  ngOnDestroy(): void {
    if (this.instance) {
      from(this.instance.isReady).subscribe(() => {
        this.instance.destroy();
      });
    }
  }

  /**
   * 初始化
   * @private
   */
  private initialize(): void {
    this.instance = new windowAny.EditorJS({
      holder: this.article.nativeElement,
      data: this.value,
      placeholder: this.wpxPlaceholder,
      logLevel: 'ERROR',
      tools: {
        ...defaultTools(windowAny),
        image: {
          class: Image,
          config: {
            resolve: (done: ResolveDone) => {
              this.openMediaView('pictures', done);
            },
            change: () => {
              this.editorValue();
            }
          }
        },
        video: {
          class: Video,
          config: {
            resolve: (done: ResolveDone) => {
              this.openMediaView('videos', done);
            },
            change: () => {
              this.editorValue();
            }
          }
        }
      },
      i18n: zh_CN,
      onChange: () => {
        this.editorValue();
      }
    });

    from(this.instance.isReady).subscribe(() => {
      this.loading = false;
      this.cd.detectChanges();
    });
  }

  private openMediaView(type: MediaType, done: ResolveDone): void {
    this.modal.create({
      nzBodyStyle: { background: '#f0f2f5' },
      nzWidth: 960,
      nzContent: WpxMediaViewComponent,
      nzComponentParams: {
        wpxType: type,
        wpxFallback: this.wpxFallback,
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
  }

  /**
   * 设置编辑器数据
   * @private
   */
  private editorValue(): void {
    from(this.instance?.save() as Promise<any>).subscribe(data => {
      this.value = {
        ...this.value,
        ...data
      };
      this.onChange!(this.value);
    });
  }

  /**
   * 设置标题
   */
  setTitle(): void {
    this.value = {
      ...this.value,
      title: this.title
    };
    this.onChange!(this.value);
  }

  /**
   * 清除内容
   */
  clear(): void {
    this.instance.blocks.clear();
    this.title = '';
    this.value = {};
    this.onChange!(this.value);
  }
}
