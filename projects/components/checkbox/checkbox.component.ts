import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'wpx-checkbox',
  template: ` <nz-checkbox-group [(ngModel)]="options" (ngModelChange)="changed($event)"></nz-checkbox-group> `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WpxCheckboxComponent),
      multi: true
    }
  ]
})
export class WpxCheckboxComponent implements ControlValueAccessor {
  @Input() options: NzCheckBoxOptionInterface[] = [];

  values?: string[];

  private onChange?: (value: string[]) => void;
  private onTouched?: () => void;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.values = value ?? [];
    this.options = [
      ...this.options.map(v => {
        v.checked = this.values?.includes(v.value);
        return v;
      })
    ];
  }

  changed(data: NzCheckBoxOptionInterface[]): void {
    this.values = [...data.filter(v => v.checked).map(v => v.value)];
    this.onChange!(this.values);
  }
}
