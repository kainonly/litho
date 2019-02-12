import {NgModule} from '@angular/core';
import {PipeUndefinedComponent} from './pipe-undefined.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: PipeUndefinedComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PipeUndefinedComponent]
})
export class PipeUndefinedModule {
}
