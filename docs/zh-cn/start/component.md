# 组件定义

> 辅助框架默认组件主要包含：app.component.ts、dashboards/\*、login/\*。

#### 手动修改

将 `app.component.ts` 修改：

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
}
```

> 子组件通常包含5个文件：_.component.html、_.component.scss、_.component.ts、_.module.ts、language.ts，存储在pages目录内。