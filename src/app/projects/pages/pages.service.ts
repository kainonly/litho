import { Injectable } from '@angular/core';

@Injectable()
export class PagesService {
  collapsed = false;

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
