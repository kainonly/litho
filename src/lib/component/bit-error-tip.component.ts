import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

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
export class BitErrorTipComponent implements OnInit {
  @ViewChild('ref', {static: true}) ref: TemplateRef<any>;
  @Input() hasError: any = {};
  errorLists: any[] = [];

  ngOnInit() {
    for (const key in this.hasError) {
      if (this.hasError.hasOwnProperty(key)) {
        this.errorLists.push({
          key,
          error: this.hasError[key]
        });
      }
    }
  }
}
