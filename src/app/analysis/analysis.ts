import { Component } from '@angular/core';

import { SharedModule } from '@shared';

import { Layout } from '../__layout/layout';

@Component({
  standalone: true,
  imports: [SharedModule, Layout],
  selector: 'app-analysis',
  templateUrl: './analysis.html'
})
export class Analysis { }

