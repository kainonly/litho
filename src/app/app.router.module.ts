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
      {path: '{pipe-defined}', loadChildren: './pages/pipe-defined/pipe-defined.module#PipeDefinedModule'},
      {path: '{pipe-undefined}', loadChildren: './pages/pipe-undefined/pipe-undefined.module#PipeUndefinedModule'},
      {path: '{pipe-emptyarray}', loadChildren: './pages/pipe-emptyarray/pipe-emptyarray.module#PipeEmptyarrayModule'},
      {path: '{pipe-emptyobject}', loadChildren: './pages/pipe-emptyobject/pipe-emptyobject.module#PipeEmptyobjectModule'},
      {path: '{pipe-objecttoarray}', loadChildren: './pages/pipe-objecttoarray/pipe-objecttoarray.module#PipeObjecttoarrayModule'},
      {path: '{pipe-objecttomap}', loadChildren: './pages/pipe-objecttomap/pipe-objecttomap.module#PipeObjecttomapModule'},
      {path: '{pipe-jsonparse}', loadChildren: './pages/pipe-jsonparse/pipe-jsonparse.module#PipeJsonparseModule'},
      {path: '{pipe-jsonchose}', loadChildren: './pages/pipe-jsonchose/pipe-jsonchose.module#PipeJsonchoseModule'},
      {
        path: '{operate-asyncvalidator}',
        loadChildren: './pages/operate-asyncvalidator/operate-asyncvalidator.module#OperateAsyncvalidatorModule'
      },
      {path: '{operate-emptyarray}', loadChildren: './pages/operate-emptyarray/operate-emptyarray.module#OperateEmptyarrayModule'},
      {path: '{operate-emptyobject}', loadChildren: './pages/operate-emptyobject/operate-emptyobject.module#OperateEmptyobjectModule'},
      {
        path: '{operate-factorylocales}',
        loadChildren: './pages/operate-factorylocales/operate-factorylocales.module#OperateFactorylocalesModule'
      },
      {path: '{operate-getroutename}', loadChildren: './pages/operate-getroutename/operate-getroutename.module#OperateGetroutenameModule'},
      {
        path: '{operate-i18ncontrolsasyncvalidate}',
        loadChildren: './pages/operate-i18ncontrolsasyncvalidate/operate-i18ncontrolsasyncvalidate.module#OperateI18ncontrolsasyncvalidateModule'
      },
      {
        path: '{operate-i18ncontrolsvalidate}',
        loadChildren: './pages/operate-i18ncontrolsvalidate/operate-i18ncontrolsvalidate.module#OperateI18ncontrolsvalidateModule'
      },
      {
        path: '{operate-i18ncontrolsvalue}',
        loadChildren: './pages/operate-i18ncontrolsvalue/operate-i18ncontrolsvalue.module#OperateI18ncontrolsvalueModule'
      },
      {
        path: '{operate-objecttoarray}',
        loadChildren: './pages/operate-objecttoarray/operate-objecttoarray.module#OperateObjecttoarrayModule'
      },
      {path: '{operate-objecttomap}', loadChildren: './pages/operate-objecttomap/operate-objecttomap.module#OperateObjecttomapModule'},
      {path: '{component-form}', loadChildren: './pages/component-form/component-form.module#ComponentFormModule'},
      {path: '{component-i18n}', loadChildren: './pages/component-i18n/component-i18n.module#ComponentI18nModule'},
      {path: '{component-language}', loadChildren: './pages/component-language/component-language.module#ComponentLanguageModule'},
      {path: '{component-table}', loadChildren: './pages/component-table/component-table.module#ComponentTableModule'},
      {path: '{component-upload}', loadChildren: './pages/component-upload/component-upload.module#ComponentUploadModule'},
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
