## 组件异步验证器

#### asyncValidator(req: Observable<any>, field = 'duplicated')

```typescript
import {Observable} from 'rxjs';

export function asyncValidator(req: Observable<any>, field = 'duplicated'): Observable<any> {
  return Observable.create((observer) => {
    setTimeout(() => {
      req.subscribe((res) => {
        if (!res.error) {
          if (res.data) {
            observer.next({error: true, [field]: true});
          } else {
            observer.next(null);
          }
        } else {
          observer.next({error: true});
        }
        observer.complete();
      });
    }, 1000);
  });
}
```

- **req** 请求对象
- **field** 自定义返回

在组件内定义异步验证器

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
      username: [null, [Validators.required,Validators.minLength(4),Validators.maxLength(20)],[this.validedUsername]],
    });
  }

  validedUsername = (control: AbstractControl) => asyncValidator(this.adminService.validedUsername(control.value));
}
```
