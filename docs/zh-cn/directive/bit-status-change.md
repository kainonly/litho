## bitStatusChange 状态切换

##### @Directive({selector: '[bitStatusChange]'})

```typescript
@Directive({
  selector: '[bitStatusChange]'
})
export class BitStatusChangeDirective {
  @Input() bitStatusChange: Observable<any>;
  @Input() bitControl = false;
  @Output() response: EventEmitter<any> = new EventEmitter();

  constructor(
    private bit: BitService,
    private nzSwitchComponent: NzSwitchComponent,
    private notificationService: NzNotificationService
  ) {
    nzSwitchComponent.nzControl = true;
    nzSwitchComponent.nzCheckedChildren = bit.l.on;
    nzSwitchComponent.nzUnCheckedChildren = bit.l.off;
  }

  @HostListener('click')
  onClick() {
    this.bitStatusChange.subscribe(res => {
      if (!res.error) {
        this.notificationService.success(this.bit.l.operateSuccess, this.bit.l.statusSuccess);
      } else {
        if (this.bitControl) {
          this.response.emit(res);
        } else {
          this.notificationService.error(this.bit.l.operateError, this.bit.l.statusError);
        }
      }
    });
  }
}
```

- **@Input() bitStatusChange** `Observable< any >` 状态切换请求
- **@Input() bitControl** `boolean` 是否手动处理返回提示，默认 `false`
- **@Output() response** `EventEmitter< any >` 获取请求的响应值

例如控制管理员的状态

```html
<nz-switch [(ngModel)]="data.status"
           [bitStatusChange]="ramService.status(data)"
           [bitControl]="true"
           (response)="status($event)">
</nz-switch>
```

自定义返回提示

```typescript
status(res: any) {
    switch (res.msg) {
        case 'error:self':
            this.notification.error(this.bit.l.operateError, this.bit.l.errorStatusSelf);
            break;
        default:
            this.notification.error(this.bit.l.operateError, this.bit.l.statusError);
    }
}
```