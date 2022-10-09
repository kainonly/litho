import { OnDestroy, OnInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Nav, WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-apps-nav',
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit, OnDestroy {
  @Input() data: Nav[] = [];
  openIds: Set<string> = new Set<string>();

  private pageIdSubscription!: Subscription;

  constructor(public wpx: WpxService) {}

  ngOnInit(): void {
    // this.wpx.navsRecord.subscribe(record => {
    //   this.pageIdSubscription = this.wpx.pageId.subscribe(id => {
    //     this.openIds.clear();
    //     let node: Nav | undefined = record[id];
    //     while (node) {
    //       this.openIds.add(node._id);
    //       node = node.parentNode ?? undefined;
    //     }
    //   });
    // });
  }

  ngOnDestroy(): void {
    // this.pageIdSubscription.unsubscribe();
  }
}
