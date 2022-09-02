import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnyDto, Manual, Page, WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FactorySerivce } from '../factory.serivce';
import { ScopeComponent } from './scope/scope.component';

@Component({
  selector: 'wpx-admin-factory-manual',
  templateUrl: './manual.component.html'
})
export class ManualComponent implements OnInit {
  /**
   * 页面单元 ID
   */
  id!: string;
  /**
   * 页面单元
   */
  page?: AnyDto<Page>;

  /**
   * 权限细粒化
   */
  policies: any[] = [];

  constructor(
    public wpx: WpxService,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private factory: FactorySerivce
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(v => {
      this.id = v['id'];
      this.getData();
    });
  }

  /**
   * 获取数据
   */
  getData(): void {
    this.factory.findById(this.id).subscribe(page => {
      this.page = page;
      this.policies = [...Object.entries(page.manual!.policies)];
    });
  }

  /**
   * 设置表单
   * @param component
   * @private
   */
  private setManual(component: Type<{ id: string; manual: Manual }>): void {
    this.modal.create({
      nzTitle: '设置',
      nzContent: component,
      nzComponentParams: {
        id: this.id,
        manual: this.page!.manual
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  /**
   * 设置页面
   */
  setScope(): void {
    this.setManual(ScopeComponent);
  }
}
