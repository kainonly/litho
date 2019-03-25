## 语言包生产

#### factoryLocales(packer: any)

```typescript
export function factoryLocales(packer: any): any {
  const source = {
    zh_cn: {},
    en_us: {}
  };
  for (const i in packer) {
    if (packer.hasOwnProperty(i)) {
      source.zh_cn[i] = packer[i][0];
      source.en_us[i] = packer[i][1];
    }
  }
  return source;
}
```

- **packer** 语言包文件

定义一个语言包数据，索引顺序按照 `['zh_cn','en_us']`

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

语言包生产

```typescript
import packer from './language';

const language = factoryLocales(packer);

console.log(language.zh_cn.username); // 用户名称
console.log(language.en_us.username); // Username
```