import {Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'bit-error-tip',
  template: `
      <ng-template #ref let-control>
          <ng-container *ngFor="let data of errorLists">
              <ng-container *ngIf="control.hasError(data.key)">
                  {{data.error}}
              </ng-container>
          </ng-container>
      </ng-template>
  `
})
export class BitErrorTipComponent implements OnChanges {
  @ViewChild('ref', {static: true}) ref: TemplateRef<any>;
  @Input() hasError: any = {};
  errorLists: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('hasError')) {
      this.errorLists = [];
      const errors = changes.hasError.currentValue;
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          this.errorLists.push({
            key,
            error: errors[key]
          });
        }
      }
    }
  }
}
