import {NgModule} from '@angular/core';
import {ComponentI18nComponent} from './component-i18n.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: ComponentI18nComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComponentI18nComponent]
})
export class ComponentI18nModule {
}
