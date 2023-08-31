import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { VideosService } from '@common/services/videos.service';
import { Any } from '@weplanx/ng';

@Component({
  selector: 'app-videos-input',
  template: `
    <wpx-filebrowser-input
      [wpxApi]="videos"
      [wpxType]="'video'"
      [wpxFallback]="['assets', 'photon.svg'] | wpxAssets"
      [wpxLimit]="limit"
      [(wpxValue)]="value"
      (wpxValueChange)="onChanged($event)"
    >
    </wpx-filebrowser-input>
  `,
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
  value: string[] = [];

  onChanged!: (value: string[]) => void;
  private onTouched!: () => void;

  constructor(public videos: VideosService) {}

  registerOnChange(fn: Any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: Any): void {
    this.onTouched = fn;
  }

  writeValue(v: string[]): void {
    this.value = v;
  }
}
