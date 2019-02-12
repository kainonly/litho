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
      {path: '{base-config}', loadChildren: './pages/base-config/base-config.module#BaseConfigModule'},
      {path: '{base-bit}', loadChildren: './pages/base-bit/base-bit.module#BaseBitModule'},
      {path: '{base-http}', loadChildren: './pages/base-http/base-http.module#BaseHttpModule'},
      {path: '{base-events}', loadChildren: './pages/base-events/base-events.module#BaseEventsModule'},
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
