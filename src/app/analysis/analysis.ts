import { Component } from '@angular/core';

import { SharedModule } from '@shared';

import { Layout } from '../__layout/layout';

@Component({
  imports: [SharedModule, Layout],
  selector: 'app-analysis',
  template: `<app-layout appNav="analysis"> </app-layout>`
})
export class Analysis {}
