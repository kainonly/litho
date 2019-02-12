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
      {path: '{common-swal}', loadChildren: './pages/common-swal/common-swal.module#CommonSwalModule'},
      {path: '{curd-add}', loadChildren: './pages/curd-add/curd-add.module#CurdAddModule'},
      {path: '{curd-delete}', loadChildren: './pages/curd-delete/curd-delete.module#CurdDeleteModule'},
      {path: '{curd-edit}', loadChildren: './pages/curd-edit/curd-edit.module#CurdEditModule'},
      {path: '{curd-get}', loadChildren: './pages/curd-get/curd-get.module#CurdGetModule'},
      {path: '{curd-lists}', loadChildren: './pages/curd-lists/curd-lists.module#CurdListsModule'},
      {path: '{curd-originlists}', loadChildren: './pages/curd-originlists/curd-originlists.module#CurdOriginlistsModule'},
      {path: '{curd-status}', loadChildren: './pages/curd-status/curd-status.module#CurdStatusModule'},
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
