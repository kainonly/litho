## Form Explain

!> Due to changes in the verification method of NgZorro 8, this method has been deprecated in NGX Bit > 8 version. For the new method, please check [Error Tip](en-us/component/bit-error-tip)

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

- **@Input() set bitExplain(args: BitExplainArgs)** Set the form reminder for `formControl`

For example, use in a form

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