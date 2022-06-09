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
import { AsyncSubject, from } from 'rxjs';

import { WpxService } from '@weplanx/ng';
import { MediaType, WpxMediaViewComponent } from '@weplanx/ng/media';
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
  /**
   * 内容提示
   */
  @Input() wpxPlaceholder?: string;
  /**
   * 媒体等待提示图
   */
  @Input() wpxFallback?: string;
  /**
   * 文章视图
   */
  @ViewChild('article', { static: true }) article!: ElementRef;
  /**
   * 标题
   */
  title = '';
  /**
   * 加载状态
   */
  loading = true;
  /**
   * 默认值
   */
  value: any = {};
  /**
   * 完成载入
   */
  $complete: AsyncSubject<unknown> = new AsyncSubject<unknown>();
  /**
   * EditorJS
   * @private
   */
  private instance?: any;
  private onChange?: (value: any) => void;
  private onTouched?: () => void;

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

  /**
   * 载入数据
   * @param value
   */
  writeValue(value: any): void {
    if (value) {
      this.value = value;
      this.title = value?.title;
      this.$complete.next(undefined);
      this.$complete.complete();
    }
  }

  ngAfterViewInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    if (window.hasOwnProperty('EditorJS')) {
      this.$complete.subscribe(() => {
        this.initialize();
      });
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

  /**
   * 开启媒体
   * @param type
   * @param done
   * @private
   */
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
        title: this.title,
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
    this.title = '';
    this.instance.blocks.clear();
    this.value = {};
    this.onChange!(this.value);
  }
}
