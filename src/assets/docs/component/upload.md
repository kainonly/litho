# 上传

生成一个通用处理的表格需要以下步骤

> 上传组件可直接使用 Ng-Zorro 的上传组件

在组件中定义上传相关函数与属性，因为使用 FormGroup 会缺乏一些灵活性，所以可以直接将上传属性定义在组件中，最后提交前再去整合提交数据

```typescript
export class AdminAddComponent implements OnInit {
    avatar = '';

    constructor(private swal: SwalService,
                private fb: FormBuilder,
                public bit: BitService,
                private notification: NzNotificationService,
                private adminService: AdminService,
                private roleService: RoleService) {
    }

    upload(info) {
        if (info.type === 'success') {
            this.avatar = info.file.response.data.save_name;
            this.notification.success(this.bit.l['success'], this.bit.l['upload_success']);
        }
        if (info.type === 'error') {
            this.notification.error(this.bit.l['notice'], this.bit.l['upload_error']);
        }
    }

    submit = (data) => {
        if (this.avatar) {
            data.avatar = this.avatar;
        }
  };
}
```

在模版中使用

```html
<nz-form-item>
    <nz-form-label [nzSpan]="7" nzRequired>
        {{bit.l['avatar']}}
    </nz-form-label>
    <nz-form-control [nzSpan]="12">
        <p>{{bit.l['avatar_tips']}}</p>
        <nz-upload nzName="image"
                    [nzWithCredentials]="true"
                    [nzAction]="bit.uploads"
                    [nzSize]="5120"
                    nzListType="picture-card"
                    [nzShowUploadList]="false"
                    (nzChange)="upload($event)">
            <ng-container *ngIf="!avatar">
                <i nz-icon type="plus"></i>
                <div class="ant-upload-text">{{bit.l['upload']}}</div>
            </ng-container>
            <img width="120" *ngIf="avatar" [src]="bit.static+avatar" class="avatar">
        </nz-upload>
    </nz-form-control>
</nz-form-item>
```

#### -nzWithCredentials

如果存在携带 `Cookie` 必须将其设为 `true`，通常前后端分离会将 `Token` 存在服务端的 `Cookie` 中

#### - nzAction

则是上传请求地址，可以直接调用 `bit.uploads`

#### - nzChange

中函数就是组件中的上传