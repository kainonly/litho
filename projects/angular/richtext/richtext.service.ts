import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { concatWith, delay, fromEvent, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WpxRichtextService {
  private url = 'https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest';
  private plugins: string[] = [
    'https://cdn.jsdelivr.net/npm/@editorjs/paragraph@latest',
    'https://cdn.jsdelivr.net/npm/@editorjs/header@latest',
    'https://cdn.jsdelivr.net/npm/@editorjs/delimiter@latest',
    'https://cdn.jsdelivr.net/npm/@editorjs/underline@latest',
    'https://cdn.jsdelivr.net/npm/@editorjs/nested-list@latest',
    'https://cdn.jsdelivr.net/npm/@editorjs/checklist@latest',
    'https://cdn.jsdelivr.net/npm/@editorjs/table@latest'
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
