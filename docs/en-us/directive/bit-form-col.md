## 表单共用栅格

##### @Directive({selector: '[bitFormControlCol]'})

FormControlCol 的共用栅格，由配置决定

```typescript
@Directive({
  selector: '[bitFormControlCol]'
})
export class BitFormControlColDirective implements OnInit {
  private col: any;
  @Input() bitFormControlCol: string;

  constructor(private nzFormControlComponent: NzFormControlComponent,
              private configService: ConfigService) {
  }

  ngOnInit() {
    if (this.bitFormControlCol !== undefined && this.configService.formControlCol.hasOwnProperty(this.bitFormControlCol)) {
      this.col = this.configService.formControlCol[this.bitFormControlCol];
    } else {
      this.col = this.configService.formControlCol.common;
    }

    this.nzFormControlComponent.nzXs = this.col.hasOwnProperty('nzXs') ? this.col.nzXs : null;
    this.nzFormControlComponent.nzSm = this.col.hasOwnProperty('nzSm') ? this.col.nzSm : null;
    this.nzFormControlComponent.nzMd = this.col.hasOwnProperty('nzMd') ? this.col.nzMd : null;
    this.nzFormControlComponent.nzLg = this.col.hasOwnProperty('nzLg') ? this.col.nzLg : null;
    this.nzFormControlComponent.nzXl = this.col.hasOwnProperty('nzXl') ? this.col.nzXl : null;
    this.nzFormControlComponent.nzXXl = this.col.hasOwnProperty('nzXXl') ? this.col.nzXXl : null;
    this.nzFormControlComponent.setClassMap();
  }
}
```

在表单中使用

```html
<nz-form-control bitFormControlCol nzHasFeedback>
    <input nz-input formControlName="email" [placeholder]="bit.l['emailPlaceholder']"/>
    <nz-form-explain *bitExplain="{
        form:form,
        name:'email',
        explain:{
        email:bit.l['emailCorrectly']
        }
    };let msg">{{msg}}</nz-form-explain>
</nz-form-control>

<nz-form-control bitFormControlCol="submit">
    <button nz-button nzType="primary" [disabled]="!form.valid">
        {{bit.l['submit']}}
    </button>
    <button nz-button type="button" bitBack>
        {{bit.l['cancel']}}
    </button>
</nz-form-control>
```

##### @Directive({selector: '[bitFormLabelCol]'})

FormLabelCol 的共用栅格，由配置决定

```typescript
@Directive({
  selector: '[bitFormLabelCol]'
})
export class BitFormLabelColDirective implements OnInit {
  private col: any;
  @Input() bitFormLabelCol: string;

  constructor(private nzFormLabelComponent: NzFormLabelComponent,
              private configService: ConfigService) {
  }

  ngOnInit() {
    if (this.bitFormLabelCol !== undefined && this.configService.formControlCol.hasOwnProperty(this.bitFormLabelCol)) {
      this.col = this.configService.formLabelCol[this.bitFormLabelCol];
    } else {
      this.col = this.configService.formLabelCol.common;
    }

    this.nzFormLabelComponent.nzXs = this.col.hasOwnProperty('nzXs') ? this.col.nzXs : null;
    this.nzFormLabelComponent.nzSm = this.col.hasOwnProperty('nzSm') ? this.col.nzSm : null;
    this.nzFormLabelComponent.nzMd = this.col.hasOwnProperty('nzMd') ? this.col.nzMd : null;
    this.nzFormLabelComponent.nzLg = this.col.hasOwnProperty('nzLg') ? this.col.nzLg : null;
    this.nzFormLabelComponent.nzXl = this.col.hasOwnProperty('nzXl') ? this.col.nzXl : null;
    this.nzFormLabelComponent.nzXXl = this.col.hasOwnProperty('nzXXl') ? this.col.nzXXl : null;
    this.nzFormLabelComponent.setClassMap();
  }
}
```

在表单中使用

```html
<nz-form-label bitFormLabelCol>
    {{bit.l['email']}}
</nz-form-label>
```

