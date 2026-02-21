import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared';

import { Layout } from '../__layout/layout';

@Component({
  imports: [SharedModule, Layout, RouterModule],
  selector: 'app-system',
  templateUrl: './system.html'
})
export class Settings { }
