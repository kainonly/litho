import {NgModule} from '@angular/core';
import {ComponentUploadComponent} from './component-upload.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: ComponentUploadComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComponentUploadComponent]
})
export class ComponentUploadModule {
}
