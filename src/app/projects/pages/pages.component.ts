import { Component } from '@angular/core';

import { PagesService } from './pages.service';

@Component({
  selector: 'app-projects-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.compoent.scss']
})
export class PagesComponent {
  controlCollapsed = false;

  constructor(public pages: PagesService) {}

  toggleControlCollapsed(): void {
    this.controlCollapsed = !this.controlCollapsed;
  }
}
