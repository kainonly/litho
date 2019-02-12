import {NgModule} from '@angular/core';
import {BaseConfigComponent} from './base-config.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: BaseConfigComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BaseConfigComponent]
})
export class BaseConfigModule {
}
