import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { WpxRouter } from '../types';
import { WpxPagesService } from './wpx-pages.service';

@Component({
  selector: 'wpx-pages',
  templateUrl: './wpx-pages.component.html'
})
export class WpxPagesComponent implements OnInit, OnDestroy {
  router?: WpxRouter;
  private pageSubscription!: Subscription;
  constructor(private wpxPages: WpxPagesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageSubscription = this.wpxPages.page.subscribe(page => {
      if (!!page.router) {
        this.router = page.router;
        console.log(page);
        console.log(this.route.snapshot.params);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
  }
}
