import {NgModule} from '@angular/core';
import {PipeEmptyobjectComponent} from './pipe-emptyobject.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: PipeEmptyobjectComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PipeEmptyobjectComponent]
})
export class PipeEmptyobjectModule {
}
