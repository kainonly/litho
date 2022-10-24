import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';
import { ToolbarModule } from '@common/toolbar/toolbar.module';

import { FactoryComponent } from './factory.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  {
    path: '',
    component: FactoryComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      { path: '', redirectTo: '/factory/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, ToolbarModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [FactoryComponent, NavComponent, HomeComponent]
})
export class FactoryModule {}
