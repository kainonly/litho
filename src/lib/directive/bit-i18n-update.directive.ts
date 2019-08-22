import {Directive, OnDestroy, OnInit} from '@angular/core';
import {FormControlName} from '@angular/forms';
import {Subscription} from 'rxjs';
import {BitService} from '../common/bit.service';

@Directive({
  selector: '[bitI18nUpdate]'
})
export class BitI18nUpdateDirective implements OnInit, OnDestroy {
  private valueChanges: Subscription;

  constructor(
    private bit: BitService,
    private formControlName: FormControlName,
  ) {
  }

  ngOnInit(): void {
    const controlName = this.formControlName.name;
    const formGroup = this.formControlName.control.parent;
    const formGroupName = this.formControlName.path[0];
    this.valueChanges = this.formControlName.control.valueChanges.subscribe(() => {
      const emptyI18n = [];
      for (const x of this.bit.i18nContain) {
        const formControl = formGroup.get(x);
        if (x !== controlName) {
          formControl.updateValueAndValidity();
        }
        if (!formControl.value) {
          emptyI18n.push(x);
        }
      }
      Reflect.set(this.bit.i18nTooltip, formGroupName, emptyI18n);
    });
  }

  ngOnDestroy(): void {
    this.valueChanges.unsubscribe();
  }
}
