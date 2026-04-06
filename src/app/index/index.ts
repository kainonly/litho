import { Component } from '@angular/core';

import { SharedModule } from '@shared';

import { Layout } from '../__layout/layout';

@Component({
  imports: [SharedModule, Layout],
  selector: 'app-index',
  template: `<app-layout appNav="index"> </app-layout>`
})
export class Index {}
