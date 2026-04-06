import { Component } from '@angular/core';

import { SharedModule } from '@shared';

import { Layout } from '../__layout/layout';

@Component({
  imports: [SharedModule, Layout],
  selector: 'app-system',
  template: `<app-layout appNav="system"> </app-layout>`
})
export class Settings {}
