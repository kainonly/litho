# 模块定义

> 这里模块定义分为主模块与懒加载扩展模块

##### 懒加载扩展模块

同级下创建 `app.ext.module.ts`，该模块主要提供给懒加载路由的组件子模块

```typescript
import {NgModule} from '@angular/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxBitPipeModule} from 'ngx-bit';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    NgxBitPipeModule,
  ],
})
export class AppExtModule {
}
```