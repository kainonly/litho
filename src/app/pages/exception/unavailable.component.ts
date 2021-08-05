import { Component } from '@angular/core';

@Component({
  selector: 'app-exception-500',
  template: `
    <bit-ph skip></bit-ph>
    <nz-result nzStatus="500" nzTitle="500" [nzSubTitle]="subTitle">
      <ng-template #subTitle> 抱歉，服务器繁忙请稍后再试 </ng-template>
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/"> 回到主页 </button>
      </div>
    </nz-result>
  `
})
export class UnavailableComponent {}
