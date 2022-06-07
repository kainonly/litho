import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { FactorySerivce } from './factory.serivce';

@Component({
  selector: 'wpx-admin-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements OnInit {
  pageId: string = '';

  constructor(
    public factory: FactorySerivce,
    private modal: NzModalService,
    private nzContextMenuService: NzContextMenuService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute
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
    if (!!id) {
      this.router.navigate(['admin', 'application', 'factory', id, 'schema']);
    } else {
      this.router.navigate(['admin', 'application', 'factory', 'home']);
    }
  }
}
