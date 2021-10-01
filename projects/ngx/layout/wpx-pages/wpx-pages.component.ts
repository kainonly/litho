import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { WpxRouter } from '../types';
import { WpxLayoutService } from '../wpx-layout.service';
import { WpxPagesService } from './wpx-pages.service';

@Component({
  selector: 'wpx-pages',
  templateUrl: './wpx-pages.component.html'
})
export class WpxPagesComponent implements OnInit {
  schema!: string;
  template!: string;

  constructor(private route: ActivatedRoute, private wpxLayout: WpxLayoutService, private wpxPages: WpxPagesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.schema = data.schema;
      this.template = data.template;
    });
  }
}
