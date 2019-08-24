## bitI18nUpdate - I18n Union Update

#### @Directive({selector: '[bitI18nUpdate]'})

```typescript
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
```

Use in a form

```html
<nz-form-item formGroupName="name">
    <nz-form-label bitFormLabelCol nzRequired>
    {{bit.l['name']}}
    </nz-form-label>
    <ng-container *ngFor="let x of bit.i18nContain">
    <nz-form-control *ngIf="bit.equalI18n(x)"
                        nzHasFeedback
                        bitFormControlCol
                        [nzErrorTip]="name.ref">
        <input nz-input
                bitI18nUpdate
                [nz-tooltip]="tooltip.ref"
                [formControlName]="x"
                [placeholder]="bit.l['namePlaceholder']"/>
        <bit-i18n-tooltip #tooltip groupName="name"></bit-i18n-tooltip>
        <bit-error-tip #name [hasError]="{
            required:bit.l['nameRequire']
        }"></bit-error-tip>
    </nz-form-control>
    </ng-container>
</nz-form-item>
```