import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { concatWith, delay, fromEvent, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
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

  constructor(@Inject(DOCUMENT) private document: Document) {}

  setup(url: string, plugins: string[]): void {
    this.url = url;
    this.plugins = plugins;
  }

  loadScript(): Observable<any> {
    const editorjs = this.document.createElement('script');
    editorjs.src = this.url;
    editorjs.async = true;
    this.document.head.append(editorjs);
    const events: Array<Observable<any>> = [];
    this.plugins?.forEach(url => {
      const plugin = this.document.createElement('script');
      plugin.src = url;
      plugin.async = true;
      this.document.head.append(plugin);
      events.push(fromEvent(plugin, 'load'));
    });
    return fromEvent(editorjs, 'load').pipe(concatWith(...events), delay(200));
  }
}
