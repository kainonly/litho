import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { WpxMediaInputComponent } from '@weplanx/ng/media';

import { VideosComponent } from './videos.component';

@Component({
  selector: 'app-videos-input',
  templateUrl: './videos-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VideosInputComponent),
      multi: true
    }
  ]
})
export class VideosInputComponent implements ControlValueAccessor {
  @Input() limit = 5;
  @Input() max = 5;
  @ViewChild(WpxMediaInputComponent) media!: WpxMediaInputComponent;
  readonly component = VideosComponent;

  values: string[] = [];

  onChanged!: (value: any[]) => void;
  private onTouched!: () => void;

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(v: any): void {
    this.values = v ?? [];
  }

  get instance(): VideosComponent {
    return this.media.modalRef?.componentInstance;
  }
}
