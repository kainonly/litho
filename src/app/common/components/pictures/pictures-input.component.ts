import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { WpxMediaInputComponent } from '@weplanx/ng/media';

import { PicturesComponent } from './pictures.component';

@Component({
  selector: 'app-pictures-input',
  templateUrl: './pictures-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PicturesInputComponent),
      multi: true
    }
  ]
})
export class PicturesInputComponent implements ControlValueAccessor {
  @Input() limit = 5;
  @Input() max = 5;
  @ViewChild(WpxMediaInputComponent) media!: WpxMediaInputComponent;
  readonly component = PicturesComponent;

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

  get instance(): PicturesComponent {
    return this.media.modalRef?.componentInstance;
  }
}
