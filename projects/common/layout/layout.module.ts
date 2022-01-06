import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { WpxHeaderComponent } from './header/header.component';
import { WpxLayoutActionDirective } from './layout-action.directive';
import { WpxLayoutAlertDirective } from './layout-alert.directive';
import { WpxLayoutComponent } from './layout.component';
import { IsPageArrayPipe } from './nav/is-page-array.pipe';
import { WpxNavComponent } from './nav/nav.component';
import { OpenStatePipe } from './nav/open-state.pipe';
import { WpxPageHeaderComponent } from './page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzIconModule,
    NzSpaceModule,
    NzBreadCrumbModule,
    NzAutocompleteModule,
    WpxModule,
    NzDividerModule,
    NzDropDownModule,
    NzGridModule,
    NzBadgeModule,
    NzAvatarModule,
    NzTabsModule,
    NzListModule,
    NzLayoutModule,
    NzPopoverModule,
    NzButtonModule,
    NzInputModule
  ],
  declarations: [
    WpxLayoutComponent,
    WpxLayoutActionDirective,
    WpxLayoutAlertDirective,
    WpxHeaderComponent,
    WpxNavComponent,
    WpxPageHeaderComponent,
    OpenStatePipe,
    IsPageArrayPipe
  ],
  exports: [
    WpxLayoutComponent,
    WpxLayoutActionDirective,
    WpxLayoutAlertDirective,
    WpxHeaderComponent,
    WpxNavComponent,
    WpxPageHeaderComponent
  ]
})
export class WpxLayoutModule {}
