## ~~表单验证提示~~

!> 由于 NgZorro 8 的验证方式变动，该方式在 NGX Bit  > 8 版本中已废弃，新方式请查看[验证错误提示](zh-cn/component/bit-error-tip)

##### @Directive({selector: '[bitExplain]'})

```typescript
@Directive({
  selector: '[bitExplain]',
})
export class BitExplainDirective implements OnDestroy {
  private control: AbstractControl;
  private async: boolean;

  private statusChanges: Subscription;
  private error: any;
  private pending = false;
  private sign: string;

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>) {
  }

  @Input()
  set bitExplain(args: BitExplainArgs) {
    this.control = args.form.get(args.name);
    this.async = (args.async) ? args.async : false;
    this.statusChanges = this.control.statusChanges.subscribe(status => {
      if (status === 'PENDING') {
        if (!this.pending) {
          if (this.viewContainerRef.length !== 0) {
            this.viewContainerRef.clear();
          }
          this.pending = true;
          this.error = (args.explain.pending) ? args.explain.pending : '';
          this.viewContainerRef.createEmbeddedView(this.templateRef, {
            $implicit: this.error
          });
        }
      } else {
        if (this.pending) {
          this.pending = false;
          this.viewContainerRef.clear();
        }
        if (this.control.dirty && this.control.errors) {
          for (const sign in args.explain) {
            if (args.explain.hasOwnProperty(sign) && this.control.hasError(sign)) {
              if (this.sign !== sign) {
                this.viewContainerRef.clear();
                this.sign = sign;
                this.error = args.explain[sign];
                this.viewContainerRef.createEmbeddedView(this.templateRef, {
                  $implicit: this.error
                });
              }
              break;
            }
          }
        } else {
          this.sign = null;
          this.viewContainerRef.clear();
        }
      }
    });
  }

  ngOnDestroy() {
    this.statusChanges.unsubscribe();
  }
}
```

- **@Input() set bitExplain(args: BitExplainArgs)** 设置 `formControl` 的表单提醒信息

例如在表单中使用

```html
<nz-form-item>
    <nz-form-label bitFormLabelCol nzRequired>
        {{bit.l['username']}}
    </nz-form-label>
    <nz-form-control bitFormControlCol nzHasFeedback>
    <input nz-input formControlName="username" [placeholder]="bit.l['usernamePlaceholder']"/>
    <nz-form-explain *bitExplain="{
        form:form,
        name:'username',
        async:true,
        explain:{
        required:bit.l['usernameRequire'],
        minlength:bit.l['usernameCorrectly'],
        maxlength:bit.l['usernameCorrectly'],
        duplicated:bit.l['usernameDuplicated'],
        pending:bit.l['validating']
        }
    };let msg">{{msg}}</nz-form-explain>
    </nz-form-control>
</nz-form-item>
```