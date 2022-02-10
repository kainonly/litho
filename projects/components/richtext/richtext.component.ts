import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'wpx-richtext',
  templateUrl: './richtext.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxRichtextComponent),
      multi: true
    }
  ]
})
export class WpxRichtextComponent implements ControlValueAccessor {
  value?: string;

  private onChange?: (value: string) => void;
  private onTouched?: () => void;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }
}
