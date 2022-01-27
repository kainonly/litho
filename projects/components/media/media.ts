import { Directive, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { WpxService } from '@weplanx/common';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzModalService } from 'ng-zorro-antd/modal';

@Directive()
export class WpxMedia implements ControlValueAccessor {
  @Input() wpxFallback!: string;

  values?: string[];

  protected onChanged!: (value: any[]) => void;
  protected onTouched!: () => void;

  constructor(protected wpx: WpxService, protected modal: NzModalService, protected image: NzImageService) {}

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(v: string[]): void {
    this.values = v;
  }

  removeValue(i: number): void {
    this.values!.splice(i, 1);
    this.onChanged(this.values!);
  }

  preview(url: string): void {
    this.image.preview([
      {
        src: `${this.wpx.assets}/${url}`
      }
    ]);
  }
}
