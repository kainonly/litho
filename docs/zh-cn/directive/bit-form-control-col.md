## bitFormControlCol 共用栅格

##### @Directive({selector: '[bitFormControlCol]'})

FormControlCol 的共用栅格，由配置决定

```typescript
@Directive({
  selector: '[bitFormControlCol]'
})
export class BitFormControlColDirective implements OnInit {
  private col: any;
  @Input() bitFormControlCol: string;

  constructor(
    private nzFormControlComponent: NzFormControlComponent,
    private configService: ConfigService
  ) {
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