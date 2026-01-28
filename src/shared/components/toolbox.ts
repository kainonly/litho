import { ChangeDetectionStrategy, Component, inject, input, output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { Filter, Model } from '@shared';
import { Basic, SearchOption } from '@shared/models';

@Component({
  imports: [FormsModule, NzButtonModule, NzGridModule, NzIconModule, NzTooltipModule, NzSpaceModule, NzDrawerModule],
  selector: 'app-toolbox',
  template: `
    <nz-space-compact>
      @if (appFilter(); as filter) {
        <button nz-button [nzType]="!filter.visible() ? 'text' : 'primary'" (click)="filter.open()">
          <nz-icon nzType="filter" />
        </button>
      }
      <button nz-button nzType="text" nz-tooltip="清空" (click)="clear()">
        <nz-icon nzType="clear" />
      </button>
      <button nz-button nzType="text" nz-tooltip="刷新" (click)="refresh()">
        <nz-icon nzType="sync" />
      </button>
    </nz-space-compact>

    <ng-template #searchTitleRef>
      <nz-row nzAlign="middle" nzJustify="space-between">
        <nz-col><b>数据筛选</b></nz-col>
        <nz-col></nz-col>
        <nz-col>
          <nz-space>
            <button *nzSpaceItem nz-button form="search" type="button" (click)="clear()">重置</button>
            <button *nzSpaceItem nz-button nzType="primary" form="search" type="submit">搜索</button>
          </nz-space>
        </nz-col>
      </nz-row>
    </ng-template>

    @if (appFilter(); as filter) {
      <nz-drawer
        [nzBodyStyle]="{ overflow: 'auto' }"
        [nzVisible]="filter.visible()"
        [nzTitle]="searchTitleRef"
        [nzMask]="false"
        [nzMaskClosable]="false"
        [nzHeight]="filter.height()"
        [nzPlacement]="'bottom'"
        (nzOnClose)="filter.close()"
      >
        <ng-container *nzDrawerContent>
          <ng-content></ng-content>
        </ng-container>
      </nz-drawer>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toolbox<T extends Basic, S extends SearchOption> {
  private message = inject(NzMessageService);

  appModel = input.required<Model<T, S>>();
  appFilter = input<Filter>();
  appClearOmit = input<(keyof S)[]>([]);
  appClear = output<void>();
  appRefresh = output<void>();

  refresh(): void {
    this.message.loading('正在刷新...', { nzDuration: 500 });
    this.appRefresh.emit();
  }

  clear(): void {
    const model = this.appModel();
    const search = structuredClone(model.searchInit);
    console.log(search);
    for (const key of this.appClearOmit()) {
      search[key] = model.search[key];
    }
    for (const key in search) {
      model.search[key] = search[key];
    }
    model.sort.clear();
    model.page.set(1);
    this.appClear.emit();
  }
}
