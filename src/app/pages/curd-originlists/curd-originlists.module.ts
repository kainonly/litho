import {NgModule} from '@angular/core';
import {CurdOriginlistsComponent} from './curd-originlists.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: CurdOriginlistsComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CurdOriginlistsComponent]
})
export class CurdOriginlistsModule {
}
