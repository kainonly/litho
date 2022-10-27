import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [NavComponent, HomeComponent]
})
export class FactoryModule {}
