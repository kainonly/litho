## 验证错误提示

```html
<nz-form-control nzHasFeedback
                 [nzValidatingTip]="'正在验证'"
                 [nzErrorTip]="username.ref">
    <input nz-input formControlName="username"/>
    <bit-error-tip #username [hasError]="{
        required:'请填写用户名称',
    }"></bit-error-tip>
</nz-form-control>
```

- **@Input() hasError: any** errors 错误信息

