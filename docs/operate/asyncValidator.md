# 异步验证器

asyncValidator 是生产异步验证器的函数

### asyncValidator(req: Observable<any>)

- `req` 请求对象

例如，在组件内定义异步验证器

``` typescript
export class AdminAddComponent implements OnInit {

  constructor(private swal: SwalService,
              private fb: FormBuilder,
              public bit: BitService,
              private notification: NzNotificationService,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.bit.form = this.fb.group({
      username: [null, [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20)
          ],
          [this.validedUsername]
        ],
    });
  }

  validedUsername = (control: AbstractControl) => asyncValidator(this.adminService.validedUsername(control.value));
}
```