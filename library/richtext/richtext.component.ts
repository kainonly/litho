import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { auditTime, BehaviorSubject, from, switchMap } from 'rxjs';

import { WpxService } from '@weplanx/ng';
import { MediaType, WpxMediaViewComponent } from '@weplanx/ng/media';
import { NzModalService } from 'ng-zorro-antd/modal';

import { defaultTools, zh_CN } from './helper';
import { Image } from './image';
import { ResolveDone, RichtextData } from './types';
import { Video } from './video';

const windowAny: any = window;

@Component({
  selector: 'wpx-richtext',
  exportAs: 'wpxRichtext',
  template: ` <div #richtext></div> `,
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
   * 文章视图
   */
  @ViewChild('richtext', { static: true }) ref!: ElementRef;
  /**
   * 内容提示
   */
  @Input() wpxPlaceholder?: string;
  /**
   * 媒体等待提示图
   */
  @Input() wpxFallback?: string;
  /**
   * 载入值
   */
  $data: BehaviorSubject<RichtextData> = new BehaviorSubject(<RichtextData>null);

  /**
   * EditorJS
   * @private
   */
  private instance?: any;
  private onChange?: (value: any) => void;
  private onTouched?: () => void;

  constructor(
    private wpx: WpxService,
    private platform: Platform,
    private modal: NzModalService,
    private zone: NgZone
  ) {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(data: RichtextData): void {
    this.$data.next(data);
  }

  ngAfterViewInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.initialize();
  }

  ngOnDestroy(): void {
    if (this.instance) {
      from(this.instance.isReady).subscribe(() => {
        this.instance!.destroy();
      });
    }
  }

  /**
   * 初始化
   * @private
   */
  private initialize(): void {
    this.zone.runOutsideAngular(() => {
      this.instance = new windowAny.EditorJS({
        holder: this.ref.nativeElement,
        placeholder: this.wpxPlaceholder,
        logLevel: 'ERROR',
        tools: {
          ...defaultTools(window),
          image: {
            class: Image,
            config: {
              resolve: (done: ResolveDone) => this.openMediaView('pictures', done),
              change: () => this.save()
            }
          },
          video: {
            class: Video,
            config: {
              resolve: (done: ResolveDone) => {
                this.openMediaView('videos', done);
              },
              change: () => this.save()
            }
          }
        },
        i18n: zh_CN,
        onChange: () => this.save()
      });

      from(this.instance!.isReady)
        .pipe(switchMap(() => this.$data))
        .subscribe(data => {
          if (data) {
            this.instance!.render(data);
          }
        });
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
   * 保存数据
   * @private
   */
  private save(): void {
    from(this.instance?.save() as Promise<RichtextData>)
      .pipe(auditTime(300))
      .subscribe(data => {
        this.zone.run(() => {
          this.onChange!(data);
        });
      });
  }
}
