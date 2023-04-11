import { Injectable } from '@angular/core';

@Injectable()
export class DesignService {
  collapsed = false;

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
