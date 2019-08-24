## Error Tip

```html
<bit-error-tip #username [hasError]="{}"></bit-error-tip>
```

- **@Input() hasError** `any` form errors

```html
<nz-form-control nzHasFeedback
                 [nzValidatingTip]="'Validating...'"
                 [nzErrorTip]="username.ref">
    <input nz-input formControlName="username"/>
    <bit-error-tip #username [hasError]="{
        required:'Please Enter User Name',
    }"></bit-error-tip>
</nz-form-control>
```