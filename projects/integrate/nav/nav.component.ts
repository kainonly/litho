import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'wpx-nav',
  templateUrl: './nav.component.html'
})
export class WpxNavComponent implements OnInit, OnDestroy {
  openIds: Set<string> = new Set<string>();

  private pageIdSubscription!: Subscription;

  constructor(public wpx: WpxService) {}

  ngOnInit(): void {
    this.wpx.pages.subscribe(pages => {
      this.pageIdSubscription = this.wpx.pageId.subscribe(v => {
        this.openIds.clear();
        let node = pages[v];
        while (node) {
          this.openIds.add(node._id);
          node = node['parentNode'] ?? undefined;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.pageIdSubscription.unsubscribe();
  }
}
