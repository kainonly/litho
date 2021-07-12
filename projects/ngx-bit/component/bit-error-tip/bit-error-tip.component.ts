import { Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'bit-error-tip',
  templateUrl: './bit-error-tip.component.html'
})
export class BitErrorTipComponent implements OnChanges {
  @ViewChild('ref', { static: true }) ref!: TemplateRef<any>;
  @Input() hasError: any = {};

  values: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('hasError')) {
      this.values = [];
      const errors = changes.hasError.currentValue;
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          this.values.push({
            key,
            error: errors[key]
          });
        }
      }
    }
  }
}
