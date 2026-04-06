import { Component } from '@angular/core';

import { SharedModule } from '@shared';

import { Layout } from '../__layout/layout';

@Component({
  standalone: true,
  imports: [SharedModule, Layout],
  selector: 'app-business',
  template: `<app-layout appNav="business"> </app-layout>`
})
export class Business {}
