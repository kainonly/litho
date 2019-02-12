import {NgModule} from '@angular/core';
import {PipeDefinedComponent} from './pipe-defined.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: PipeDefinedComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PipeDefinedComponent]
})
export class PipeDefinedModule {
}
