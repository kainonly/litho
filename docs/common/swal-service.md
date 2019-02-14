## 提交反馈栏 - SwalService

#### - addAlert(res: any, reset?: any, customize?: AlertCustomize)

新增返回反馈栏

- **res** 请求响应结果
- **reset** FormGroup 重置值
- **customize** 自定义文本
    - **text** 提示文本
    - **error_text** 返回错误提示文本
    - **confirmButtonText** 确认按钮文本
    - **cancelButtonText** 取消按钮文本
- **Return** `Observable<any>`

例如, 在新增操作下组件表单提交中使用, `status` 为 `true` 表示确认提示框

```typescript

export class AdminAddComponent implements OnInit {

    ...

    submit = (data) => {
        this.adminService.add(data).pipe(
            switchMap(res => this.swal.addAlert(res, {
                status: true
            }))
        ).subscribe((status) => {
            // status => true or false
        });
    };
}
```

#### - editAlert(res: any, customize?: AlertCustomize)

修改返回反馈栏

- **res** 请求响应结果
- **customize** 自定义文本
    - **text** 提示文本
    - **error_text** 返回错误提示文本
    - **confirmButtonText** 确认按钮文本
    - **cancelButtonText** 取消按钮文本
- **Return** `Observable<any>`

例如, 在修改操作下组件表单提交中使用, `status` 为 `true` 表示确认提示框

```typescript
export class AdminEditComponent implements OnInit {
    private id: any;

    ...

    submit = (data) => {
        data.id = this.id;
        this.adminService.edit(data).pipe(
            switchMap(res => this.swal.editAlert(res))
        ).subscribe((status) => {
            // status => true or false
        });
    };
}
```

#### deleteAlert(service: Observable< any >, customize?: AlertCustomize)

删除返回反馈栏

- **service** 删除请求对象
- **customize** 自定义文本
    - **text** 提示文本
    - **confirmButtonText** 确认按钮文本
    - **cancelButtonText** 取消按钮文本
- **Return** `Observable<any>`

例如, 在删除操作下使用, 订阅返回删除请求对象的响应值

```typescript
export class AdminIndexComponent implements OnInit {
    ...

  deleteData(id: any) {
    this.swal.deleteAlert(this.adminService.delete(id)).subscribe(res => {
      if (!res.error) {
        this.notification.success(this.bit.l['operate_success'], this.bit.l['delete_success']);
        this.getLists(true);
      } else {
        switch (res.msg) {
          case 'error:self':
            this.notification.error(this.bit.l['operate_error'], this.bit.l['error_delete_self']);
            break;
          default:
            this.notification.error(this.bit.l['operate_error'], this.bit.l['delete_error']);
        }
      }
    });
  }
}
```

#### SwalService.native(title: string, message?: string, type?: SweetAlertType)

自定义反馈栏

- **title** 标题
- **message** 主体信息
- **type** `SweetAlertType` 定义参数
- **Return** `Promise<SweetAlertResult>`

#### SwalService.native(settings: SweetAlertOptions & { useRejections?: false })

自定义反馈栏

- **settings** `SweetAlertOptions` 对象定义反馈栏
- **Return** `Promise<SweetAlertResult>`