import { Component, OnInit, Type } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { CosComponent } from './cos/cos.component';
import { TencentComponent } from './tencent/tencent.component';

@Component({
  selector: 'wpx-admin-functions-cloud',
  templateUrl: './cloud.component.html'
})
export class CloudComponent implements OnInit {
  platform?: string;
  data: Record<string, any> = {};

  constructor(private wpx: WpxService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.wpx
      .getVars('cloud_platform')
      .pipe(
        switchMap(v => {
          this.platform = v.cloud_platform;
          if (!this.platform) {
            return of(null);
          }
          let vars: string[] = [];
          switch (this.platform) {
            case 'tencent':
              vars = [
                'tencent_secret_id',
                'tencent_secret_key',
                'tencent_cos_bucket',
                'tencent_cos_region',
                'tencent_cos_expired',
                'tencent_cos_limit'
              ];
              break;
          }
          return this.wpx.getVars(...vars);
        })
      )
      .subscribe(v => {
        if (!v) {
          return;
        }
        this.data = v;
      });
  }

  private setVar(component: Type<{ data: Record<string, any> }>): void {
    this.modal.create({
      nzTitle: '设置',
      nzContent: component,
      nzComponentParams: {
        data: this.data
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  linkTencent(): void {
    this.setVar(TencentComponent);
  }

  unlinkTencent(): void {
    this.wpx.setVar('cloud_platform', null).subscribe(() => {
      this.message.success('关联已取消');
      this.getData();
    });
  }

  setCos(): void {
    this.setVar(CosComponent);
  }
}
