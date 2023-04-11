import { Component } from '@angular/core';

import { DesignService } from './design.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.compoent.scss']
})
export class DesignComponent {
  controlCollapsed = false;

  constructor(public design: DesignService) {}

  toggleControlCollapsed(): void {
    this.controlCollapsed = !this.controlCollapsed;
  }
}
