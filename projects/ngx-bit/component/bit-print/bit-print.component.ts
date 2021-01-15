import { Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'bit-print',
  template: `
    <ng-template #ref>
      <ng-container *ngFor="let value of values">
        <ng-container *ngIf="!is(value);else template">
          {{value}}
        </ng-container>
        <ng-template #template>
          <ng-container *ngTemplateOutlet="value"></ng-container>
        </ng-template>
      </ng-container>
    </ng-template>
  `
})
export class BitPrintComponent implements OnChanges {
  @ViewChild('ref', { static: true }) ref: TemplateRef<any>;
  @Input() text: string;
  @Input() vars: any[];

  values: any[] = [];
  private varsMap = new Map<any, any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('vars')) {
      if (changes.vars.currentValue) {
        this.varsMap = new Map<any, any>();
        changes.vars.currentValue.forEach((value, index) => {
          this.varsMap.set('$' + index, value);
        });
      }
    }
    if (changes.hasOwnProperty('text')) {
      if (changes.text.currentValue) {
        const semi = changes.text.currentValue.replace(/\$[0-9]+/g, '**$&**');
        this.values = semi.split('**').map(v => {
          return this.varsMap.has(v) ? this.varsMap.get(v) : v;
        });
      }
    }
  }

  is(value: any): boolean {
    return value instanceof TemplateRef;
  }
}
