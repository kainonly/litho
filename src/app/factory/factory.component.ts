import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '@app';
import { PageKind } from '@weplanx/ng';
import { NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { FactorySerivce } from './factory.service';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html'
})
export class FactoryComponent implements OnInit {
  pageId = '';
  kind?: PageKind;

  constructor(
    public app: AppService,
    public factory: FactorySerivce,
    private modal: NzModalService,
    private nzContextMenuService: NzContextMenuService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.firstChild!.params.subscribe(data => {
      this.pageId = data['id'];
    });
  }

  /**
   * 选择页面单元
   * @param id
   */
  selectedPage(id: string): void {
    this.pageId = id;
    if (!id) {
      this.router.navigate([this.app.project?.namespace, 'factory', 'home']);
    } else {
      switch (this.factory.dict[id].kind) {
        case 'default':
          this.router.navigate([this.app.project?.namespace, 'factory', id, 'schema']);
          break;
        case 'aggregation':
          this.kind = 'aggregation';
          break;
        case 'manual':
          this.router.navigate([this.app.project?.namespace, 'factory', id, 'manual']);
          break;
      }
    }
    this.cd.detectChanges();
  }
}
