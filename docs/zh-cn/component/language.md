## 语言包定义

每个模块下语言包会以公用 + 独自的形式存在

定义语言包 `language.ts`

```typescript
export default {
    username: ['用户名称', 'Username'],
    username_placeholder: ['请输入用户名称', 'Please Enter Username'],
    username_require: ['当前用户名称不能为空', 'Current user name cannot be empty'],
    username_correctly: ['请输入正确的用户名称', 'Please enter the correct username'],
    username_duplicated: ['当前用户名称已存在', 'Current user name already exists'],
    role: ['权限组', 'Role Group'],
    role_placeholder: ['请选择权限组', 'Please Enter Role Group'],
    password: ['用户密码', 'Password'],
    password_placeholder: ['请输入用户密码', 'Please Enter Password'],
    password_require: ['请输入用户密码', 'Please Enter Password!'],
    password_correctly: ['请输入正确的用户密码', 'Please enter the correct user password'],
    call: ['称呼', 'Call Name'],
    call_placeholder: ['请输入称呼', 'Please Enter Call Name'],
    email: ['电子邮件', 'Email'],
    email_placeholder: ['请输入电子邮件', 'Please Enter Email'],
    email_correctly: ['请输入正确的电子邮件', 'Please enter the correct email'],
    phone: ['联系电话', 'Phone'],
    phone_placeholder: ['请输入手机号码', 'Please Enter Phone'],
    avatar: ['头像', 'Avatar']
};
```

在组件内引入语言包，并注册到 `bit.l` 属性中

```typescript
// 移入语言包
import packer from './language';

export class AdminAddComponent implements OnInit {

    constructor(public bit: BitService,
                private adminService: AdminService) {
    }

    ngOnInit() {
        // 注册语言包
        this.bit.registerLocales(packer);
    }
}
```

#### - this.bit.registerLocales(packer)

将语言包注册至 `bit.l`，这样模版下就能直接使用 `bit.l['any']`