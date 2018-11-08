# 表单

生成一个通用处理的表单需要以下步骤

> 定义组件：需要注入 `BitService`、`FormBuilder`，需要在 `ngOnInit` 周期下定义好 `FormGroup` 对象的 `this.bit.form`

```typescript
export class AdminAddComponent implements OnInit {

    // 注入相关依赖
    constructor(private swal: SwalService,
                private fb: FormBuilder,
                public bit: BitService,
                private notification: NzNotificationService,
                private adminService: AdminService) {
    }

    ngOnInit() {
        // 这里定义好 this.bit.form
        this.bit.form = this.fb.group({
        username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)], [this.validedUsername]],
        });
    }

    validedUsername = (control: AbstractControl) => asyncValidator(this.adminService.validedUsername(control.value));

    submit = (data) => {
        // 这里定义提交，data是表单提交的结果
    };
}
```

> 在模版中使用通用处理属性，`bit.submit(event, callback)` 中 `$event` 一定要赋值，这样是为了防止默认表单提交与前端验证处理，`callback` 则是在组件中的 `submit` 函数

```html
<form nz-form [formGroup]="bit.form" (submit)="bit.submit($event,submit)">
    <!-- 这里是写表单内组件 -->
    <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>
          {{bit.l['username']}}
        </nz-form-label>
        <nz-form-control [nzSpan]="12" nzHasFeedback>
          <input nz-input formControlName="username" [placeholder]="bit.l['username_placeholder']"/>
          <nz-form-explain *ngIf="bit.formExplain('username',true)">
            <ng-container *ngIf="bit.explain('username','required')">
              {{bit.l['username_require']}}
            </ng-container>
            <ng-container *ngIf="bit.explain('username','minlength')||bit.explain('username','maxlength')">
              {{bit.l['username_correctly']}}
            </ng-container>
            <ng-container *ngIf="bit.explain('username','duplicated')">
              {{bit.l['username_duplicated']}}
            </ng-container>
            <ng-container *ngIf="bit.explain('username','pending')">
              {{bit.l['validating']}}
            </ng-container>
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
</form>
```

#### - formControlName="username"

对应组件中 `this.form.get('username')` 对象，如获取这个 `FormContol` 的数值，需要 `this.form.get('username').value`

#### - bit.formExplain('username',true)

其中 `true` 代表对这个 `FormContol` 是包含异步验证的，如果仅有同步验证可以写成 `bit.formExplain('username')`。如果包含异步验证条件设为同步，这里将会不能正常工作

#### - bit.explain('username','required')

代表这个 `FormContol` 有 `required` 错误