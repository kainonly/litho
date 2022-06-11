import { Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/ng';

import { ExampleComponent } from './example/example.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
  constructor(public wpx: WpxService) {}

  ngOnInit(): void {
    this.wpx.loadPages().subscribe(() => {});
    this.wpx.setScope('example', '接入示例页', ExampleComponent);
  }
}
