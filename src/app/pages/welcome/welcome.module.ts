import {NgModule} from '@angular/core';
import {WelcomeComponent} from './welcome.component';
import {RouterModule, Routes} from '@angular/router';
import {AppExtModule} from '@ext';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomeComponent]
})
export class WelcomeModule {
}
