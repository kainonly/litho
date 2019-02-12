import {NgModule} from '@angular/core';
import {ComponentTableComponent} from './component-table.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '../../app.ext.module';

const routes: Routes = [
  {
    path: '',
    component: ComponentTableComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComponentTableComponent]
})
export class ComponentTableModule {
}
