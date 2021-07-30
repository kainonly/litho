import { Component, Input } from '@angular/core';

import { Resource } from '@common/types';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-layout-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  @Input() dict!: Record<string, Resource>;
  @Input() paths!: Record<string, number>;
  @Input() breadcrumbs: any[] = [];
  @Input() title!: string;

  constructor(public bit: BitService) {}
}
