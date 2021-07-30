import { Component } from '@angular/core';

import { BitService } from 'ngx-bit';
import { BitRouterService, ID, Resource } from 'ngx-bit/router';

@Component({
  selector: 'bit-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  constructor(public bit: BitService, private router: BitRouterService) {}

  get urls(): string[] {
    return this.router.urls;
  }

  get fragments(): string[] {
    return this.router.fragments;
  }

  get data(): Record<ID, Resource> {
    return this.router.resources.data;
  }

  get dict(): Record<string, ID> {
    return this.router.resources.dict;
  }

  /**
   * 获取标题
   */
  get title(): any {
    return this.data[this.dict[this.fragments.join('/')]].name;
  }
}
