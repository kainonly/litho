import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  QueryList
} from '@angular/core';
import { FormGroupName } from '@angular/forms';

import { BitI18nItemDirective } from './bit-i18n-item.directive';

@Component({
  selector: 'bit-i18n-tab[formGroupName]',
  template: `
    <nz-tabset nzType="card" nzSize="small" (nzSelectChange)="change()" [(nzSelectedIndex)]="selected">
      <ng-container *ngFor="let item of items">
        <nz-tab nzForceRender [nzTitle]="item.bitI18nItem.name">
          <ng-container *ngTemplateOutlet="item.ref"></ng-container>
        </nz-tab>
      </ng-container>
    </nz-tabset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitI18nTabComponent implements AfterContentInit {
  @ContentChildren(BitI18nItemDirective) items!: QueryList<BitI18nItemDirective>;
  selected = 0;

  constructor(private formGroupName: FormGroupName, private cd: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.cd.detectChanges();
  }

  change() {
    const id = this.items.get(this.selected)!.bitI18nItem.id;
    const control = this.formGroupName.control.controls[id];
    control.markAsDirty();
    control.updateValueAndValidity();
  }
}
