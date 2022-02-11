import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { from } from 'rxjs';

import { WpxService } from '@weplanx/common';
import { WpxMediaViewComponent } from '@weplanx/components/media';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Image } from './image';
import { WpxRichtextService } from './richtext.service';

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
    private zone: NgZone,
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
      this.instance.destroy();
    }
  }

  private initialize(): void {
    this.instance = new windowAny.EditorJS({
      holder: this.article.nativeElement,
      placeholder: this.wpxPlaceholder,
      logLevel: 'ERROR',
      tools: {
        paragraph: {
          class: windowAny.Paragraph,
          inlineToolbar: true
        },
        header: windowAny.Header,
        table: windowAny.Table,
        delimiter: windowAny.Delimiter,
        underline: windowAny.Underline,
        list: {
          class: windowAny.NestedList,
          inlineToolbar: true
        },
        checklist: {
          class: windowAny.Checklist,
          inlineToolbar: true
        },
        // image: windowAny.SimpleImage,
        image: {
          class: Image,
          config: {
            assets: this.wpx.assets,
            resolve: () =>
              new Promise<any>(resolve => {
                this.modal.create({
                  nzBodyStyle: { background: '#f0f2f5' },
                  nzWidth: 960,
                  nzContent: WpxMediaViewComponent,
                  nzComponentParams: {
                    wpxType: 'pictures',
                    wpxFallback: this.wpxFallback,
                    wpxHeight: '600px'
                  },
                  nzOnOk: instance => {
                    resolve({
                      url: instance.ds.getUrls([...instance.ds.checkedIds.values()])[0],
                      caption: 'unknow',
                      withBorder: false,
                      withBackground: false,
                      stretched: true
                    });
                  }
                });
              })
          }
        }
      },
      onChange: () => {
        from(this.instance?.save() as Promise<any>).subscribe(data => {
          this.value = {
            ...this.value,
            ...data
          };
          this.onChange!(this.value);
        });
      }
    });
    from(this.instance.isReady).subscribe(() => {
      this.loading = false;
      this.cd.detectChanges();
    });
  }

  titleChanged(): void {
    this.value = {
      ...this.value,
      title: this.title
    };
    this.onChange!(this.value);
  }
}
