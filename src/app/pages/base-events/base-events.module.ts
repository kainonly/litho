import {NgModule} from '@angular/core';
import {BaseEventsComponent} from './base-events.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: BaseEventsComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BaseEventsComponent]
})
export class BaseEventsModule {
}
