##### @Directive({selector: '[bitFormLabelCol]'})

FormLabelCol 的共用栅格，由配置决定

```typescript
@Directive({
  selector: '[bitFormLabelCol]'
})
export class BitFormLabelColDirective implements OnInit {
  private col: any;
  @Input() bitFormLabelCol: string;

  constructor(
    private nzFormLabelComponent: NzFormLabelComponent,
    private configService: ConfigService
  ) {
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
<nz-form-item>
  <nz-form-label bitFormLabelCol nzRequired>
    {{bit.l['status']}}
  </nz-form-label>
  <nz-form-control bitFormControlCol>
    <nz-switch formControlName="status"
                [nzCheckedChildren]="bit.l['on']"
                [nzUnCheckedChildren]="bit.l['off']">
    </nz-switch>
  </nz-form-control>
</nz-form-item>
```

