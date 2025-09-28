import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { Filter, Model } from '@shared';
import { Basic, SearchOption } from '@shared/models';

@Component({
  standalone: true,
  imports: [FormsModule, NzButtonModule, NzGridModule, NzIconModule, NzTooltipModule, NzSpaceModule, NzDrawerModule],
  selector: 'app-toolbox',
  template: `
    <nz-space-compact>
      @if (appFilter) {
        <button nz-button [nzType]="!appFilter.visible ? 'text' : 'primary'" (click)="appFilter.open()">
          <nz-icon nzType="filter" />
        </button>
      }
      <button nz-button nzType="text" (click)="clear()">
        <nz-icon nzType="clear" />
      </button>
      <button nz-button nzType="text" (click)="refresh()">
        <nz-icon nzType="sync" [nzSpin]="loading || appModel.loading()" />
      </button>
    </nz-space-compact>

    <ng-template #searchTitleRef>
      <nz-row nzAlign="middle" nzJustify="space-between">
        <nz-col><b>Filter</b></nz-col>
        <nz-col></nz-col>
        <nz-col>
          <nz-space>
            <button *nzSpaceItem nz-button form="search" type="button" (click)="clear()">Reset</button>
            <button *nzSpaceItem nz-button nzType="primary" form="search" type="submit">Search</button>
          </nz-space>
        </nz-col>
      </nz-row>
    </ng-template>

    @if (appFilter) {
      <nz-drawer
        [nzBodyStyle]="{ overflow: 'auto' }"
        [nzVisible]="appFilter.visible"
        [nzTitle]="searchTitleRef"
        [nzMask]="false"
        [nzMaskClosable]="false"
        [nzHeight]="appFilter.height"
        [nzPlacement]="'bottom'"
        (nzOnClose)="appFilter.close()"
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
  private cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) appModel!: Model<T, S>;
  @Input() appFilter?: Filter;
  @Input() appClearOmit: (keyof S)[] = [];
  @Output() appClear = new EventEmitter<void>();
  @Output() appRefresh = new EventEmitter<void>();

  loading = false;
  id = -1;

  refresh(): void {
    this.loading = true;
    this.appRefresh.emit();
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 1000);
  }

  clear(): void {
    const search = structuredClone(this.appModel.searchInit);
    for (const key of this.appClearOmit) {
      search[key] = this.appModel.search[key];
    }
    this.appModel.search = { ...search };
    this.appModel.sort.clear();
    this.appModel.page = 1;
    this.appClear.emit();
    this.cdr.detectChanges();
  }
}
