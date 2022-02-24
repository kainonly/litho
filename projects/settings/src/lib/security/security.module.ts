import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

export const security: Routes = [];

@NgModule({
  imports: [WpxShareModule, WpxModule]
})
export class SecurityModule {}
