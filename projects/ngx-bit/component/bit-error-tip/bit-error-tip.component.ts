import { Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'bit-error-tip',
  template: `
    <ng-template #ref let-control>
      <ng-container *ngFor="let value of values">
        <ng-container *ngIf="control.hasError(value.key)">
          {{value.error}}
        </ng-container>
      </ng-container>
    </ng-template>
  `
})
export class BitErrorTipComponent implements OnChanges {
  @ViewChild('ref', { static: true }) ref: TemplateRef<any>;
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
