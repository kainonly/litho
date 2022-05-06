import { Component, OnInit, Type } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FeishuComponent } from './feishu/feishu.component';
import { RedirectComponent } from './redirect/redirect.component';

@Component({
  selector: 'wpx-admin-functions-office',
  templateUrl: './office.component.html'
})
export class OfficeComponent implements OnInit {
  platform?: string;
  data: Record<string, any> = {};

  constructor(private wpx: WpxService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.wpx
      .getVars('office_platform')
      .pipe(
        switchMap(v => {
          this.platform = v.office_platform;
          if (!this.platform) {
            return of(null);
          }
          let vars: string[] = [];
          switch (this.platform) {
            case 'feishu':
              vars = [
                'feishu_app_id',
                'feishu_app_secret',
                'feishu_encrypt_key',
                'feishu_verification_token',
                'redirect_url'
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

  linkFeishu(): void {
    this.setVar(FeishuComponent);
  }

  unlinkFeishu(): void {
    this.wpx.setVar('office_platform', null).subscribe(() => {
      this.message.success('关联已取消');
      this.getData();
    });
  }

  setRedirect(): void {
    this.setVar(RedirectComponent);
  }
}
