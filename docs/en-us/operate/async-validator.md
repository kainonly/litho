## asyncValidator

#### asyncValidator(req: Observable< any >, field = 'duplicated')

- **req** `Observable< any >` Request object
- **field** `string` Custom return

Define an asynchronous validator within a component

``` typescript
import {asyncValidator} from 'ngx-bit';

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

  validedUsername = (control: AbstractControl) =>
    asyncValidator(this.adminService.validedUsername(control.value));
}
```
