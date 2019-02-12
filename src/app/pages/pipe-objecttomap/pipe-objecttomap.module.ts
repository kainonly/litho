import {NgModule} from '@angular/core';
import {PipeObjecttomapComponent} from './pipe-objecttomap.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: PipeObjecttomapComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PipeObjecttomapComponent]
})
export class PipeObjecttomapModule {
}
