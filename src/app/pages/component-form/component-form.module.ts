import {NgModule} from '@angular/core';
import {ComponentFormComponent} from './component-form.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: ComponentFormComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComponentFormComponent]
})
export class ComponentFormModule {
}
