import { Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export class WpxMedia implements ControlValueAccessor {
  protected wpxChanged!: (value: any[]) => void;
  protected wpxTouched!: () => void;

  registerOnChange(fn: any): void {
    this.wpxChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.wpxTouched = fn;
  }

  writeValue(files: any[]): void {}
}
