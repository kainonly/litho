import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppShareModule } from '@share';

import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SiderMenuComponent } from './sider-menu/sider-menu.component';

@NgModule({
  imports: [AppShareModule, RouterModule],
  declarations: [LayoutComponent, HeaderComponent, SiderMenuComponent, PageHeaderComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
