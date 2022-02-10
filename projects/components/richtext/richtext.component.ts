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
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { from } from 'rxjs';

import { WpxRichtextService } from './richtext.service';

let EditorJS: any;

@Component({
  selector: 'wpx-richtext',
  exportAs: 'wpxRichtext',
  templateUrl: './richtext.component.html',
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
    private richtext: WpxRichtextService
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
      const windowAny: any = window;
      EditorJS = windowAny.EditorJS;
      this.initialize();
    });
  }

  ngOnDestroy(): void {
    if (this.instance) {
      this.instance.destroy();
    }
  }

  private initialize(): void {
    this.zone.runOutsideAngular(() => {
      const config = this.richtext.config!(window);
      this.instance = new EditorJS({
        holder: this.article.nativeElement,
        placeholder: this.wpxPlaceholder,
        logLevel: 'ERROR',
        ...config,
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
