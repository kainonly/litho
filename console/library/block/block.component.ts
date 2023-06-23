import { Component, Input, TemplateRef } from '@angular/core';

import { Block } from './types';

@Component({
  selector: 'wpx-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  exportAs: 'Block'
})
export class WpxBlockComponent {
  @Input() wpxValue!: Block;
}
