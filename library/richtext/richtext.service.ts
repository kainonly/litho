import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WpxService } from '@weplanx/ng';

@Injectable()
export class WpxRichtextService {
  private url = 'https://cdn.kainonly.com/assets/editorjs/editorjs.js';
  private plugins: string[] = [
    'https://cdn.kainonly.com/assets/editorjs/paragraph.js',
    'https://cdn.kainonly.com/assets/editorjs/header.js',
    'https://cdn.kainonly.com/assets/editorjs/delimiter.js',
    'https://cdn.kainonly.com/assets/editorjs/underline.js',
    'https://cdn.kainonly.com/assets/editorjs/nested-list.js',
    'https://cdn.kainonly.com/assets/editorjs/checklist.js',
    'https://cdn.kainonly.com/assets/editorjs/table.js'
  ];

  constructor(private wpx: WpxService) {}

  setup(url: string, plugins: string[]): void {
    this.url = url;
    this.plugins = plugins;
  }

  loadScript(): Observable<void> {
    return this.wpx.loadScript(this.url, this.plugins);
  }
}
