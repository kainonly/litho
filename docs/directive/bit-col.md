## bitCol 栅格标识

#### @Directive({selector: '[bitCol]'})

栅格标识，由配置决定

```typescript
@Directive({
  selector: '[bitCol]'
})
export class BitColDirective implements OnInit {
  @Input() bitCol: string;

  constructor(
    private nzColDirective: NzColDirective,
    private configService: ConfigService,
  ) {
  }

  ngOnInit() {
    if (!this.configService.col.hasOwnProperty(this.bitCol)) {
      return;
    }
    const col = this.configService.col[this.bitCol];
    this.nzColDirective.nzXs = col.hasOwnProperty('nzXs') ? col.nzXs : null;
    this.nzColDirective.nzSm = col.hasOwnProperty('nzSm') ? col.nzSm : null;
    this.nzColDirective.nzMd = col.hasOwnProperty('nzMd') ? col.nzMd : null;
    this.nzColDirective.nzLg = col.hasOwnProperty('nzLg') ? col.nzLg : null;
    this.nzColDirective.nzXl = col.hasOwnProperty('nzXl') ? col.nzXl : null;
    this.nzColDirective.nzXXl = col.hasOwnProperty('nzXXl') ? col.nzXXl : null;
    this.nzColDirective.setHostClassMap();
  }
}
```

在表单中使用

```html
<nz-form-item>
  <nz-form-label bitCol="label" nzRequired>
    {{bit.l['status']}}
  </nz-form-label>
  <nz-form-control bitCol="control">
    <nz-switch 
        formControlName="status"
        [nzCheckedChildren]="bit.l['on']"
        [nzUnCheckedChildren]="bit.l['off']">
    </nz-switch>
  </nz-form-control>
</nz-form-item>
```

