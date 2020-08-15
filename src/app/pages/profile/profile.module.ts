import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    AppExtModule,
    RouterModule.forChild([{
      path: '',
      component: ProfileComponent
    }])
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule {
}
