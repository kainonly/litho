import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { concatWith, delay, fromEvent, Observable } from 'rxjs';

import { Config } from './types';

@Injectable({ providedIn: 'root' })
export class WpxRichtextService {
  private url = 'https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest';
  private plugins?: string[];
  config?: (event: any) => Config;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  setup(url: string, plugins?: string[], config?: (window: any) => Config): void {
    this.url = url;
    this.plugins = plugins;
    this.config = config;
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
