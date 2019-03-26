## Status Change

##### @Directive({selector: '[bitStatusChange]'})

```typescript
@Directive({
  selector: '[bitStatusChange]'
})
export class BitStatusChangeDirective {
  @Input() bitStatusChange: Observable<any>;
  @Input() bitControl = false;
  @Output() response: EventEmitter<any> = new EventEmitter();

  constructor(private bit: BitService,
              private nzSwitchComponent: NzSwitchComponent,
              private notificationService: NzNotificationService) {
    nzSwitchComponent.nzControl = true;
    nzSwitchComponent.nzCheckedChildren = bit.l.on;
    nzSwitchComponent.nzUnCheckedChildren = bit.l.off;
  }

  @HostListener('click')
  onClick() {
    this.bitStatusChange.subscribe(res => {
      if (!res.error) {
        this.notificationService.success(this.bit.l.operate_success, this.bit.l.status_success);
      } else {
        if (this.bitControl) {
          this.response.emit(res);
        } else {
          this.notificationService.error(this.bit.l.operate_error, this.bit.l.status_error);
        }
      }
    });
  }
}
```

- **@Input() bitStatusChange: Observable< any >** status request object
- **@Input() bitControl = false** Whether to manually process the return prompt
- **@Output() response: EventEmitter< any >** get response data

Such as controlling the status of the administrator

```html
<nz-switch [(ngModel)]="data.status"
            [bitStatusChange]="ramService.status(data)"
            [bitControl]="true"
            (response)="status($event)">
</nz-switch>
```

Such as controlling the status of the administrator...

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