import { Component, Input, TemplateRef } from '@angular/core';

import { WpxModel } from '@weplanx/ng';

import { WpxFile } from './types';

@Component({
  selector: 'wpx-filebrowser',
  templateUrl: './filebrowser.component.html',
  styleUrls: ['./filebrowser.component.less']
})
export class WpxFilebrowserComponent<T = WpxFile> {
  @Input({ required: true }) wpxModel!: WpxModel<T>;
  @Input() wpxTitle?: TemplateRef<void>;
  @Input() wpxExtra?: TemplateRef<void>;
}
