import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { AccessComponent } from './access.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { WhitelistComponent } from './whitelist/whitelist.component';

export const access: Routes = [
  {
    path: 'whitelist',
    component: WhitelistComponent
  },
  {
    path: 'blacklist',
    component: BlacklistComponent
  },
  { path: '', redirectTo: '/settings/security/access/whitelist', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxModule, WpxShareModule],
  declarations: [AccessComponent, BlacklistComponent, WhitelistComponent]
})
export class AccessModule {}
