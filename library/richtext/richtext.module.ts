import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxMediaModule } from '@weplanx/ng/media';

import { WpxRichtextComponent } from './richtext.component';
import { WpxRichtextService } from './richtext.service';

export const RICHTEXT_CONFIG = {
  url: 'https://cdn.kainonly.com/assets/editorjs/editorjs.js',
  plugins: [
    'https://cdn.kainonly.com/assets/editorjs/paragraph.js',
    'https://cdn.kainonly.com/assets/editorjs/header.js',
    'https://cdn.kainonly.com/assets/editorjs/delimiter.js',
    'https://cdn.kainonly.com/assets/editorjs/underline.js',
    'https://cdn.kainonly.com/assets/editorjs/nested-list.js',
    'https://cdn.kainonly.com/assets/editorjs/checklist.js',
    'https://cdn.kainonly.com/assets/editorjs/table.js'
  ]
};

@NgModule({
  imports: [WpxModule, WpxMediaModule, WpxShareModule],
  declarations: [WpxRichtextComponent],
  exports: [WpxRichtextComponent],
  providers: [WpxRichtextService]
})
export class WpxRichtextModule {}
