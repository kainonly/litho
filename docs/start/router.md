# 路由定义

> 辅助框架建议使用全局的懒加载路由，这样在子模块非常多的时候加载速度更为合适。

#### 路由模块

定义 `app.router.module.ts` 路由模块

> 路由path请用 `{}` 括号包住，这样方便自定义面包屑定位

```typescript
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardsComponent} from './dashboards/dashboards.component';
import {AppExtModule} from './app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardsComponent,
    children: [
      {path: '', loadChildren: './pages/welcome/welcome.module#WelcomeModule'},
      {path: '{profile}', loadChildren: './pages/profile/profile.module#ProfileModule'},
    ]
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardsComponent
  ],
})
export class AppRouterModule {
}
```
