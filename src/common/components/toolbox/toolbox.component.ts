import { CommonModule } from '@angular/common';
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

import { BasicDto, Search } from '@common';
import { Model } from '@common/utils/model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NzButtonModule, NzIconModule, NzToolTipModule, NzSpaceModule],
  selector: 'app-toolbox',
  template: `
    <nz-button-group>
      <button nz-button nzType="text" (click)="refresh()">
        <i nz-icon nzType="reload" nzTheme="outline" [nzSpin]="loading || appModel.loading()"></i>
      </button>
      <button nz-button nzType="text" (click)="clear()">
        <i nz-icon nzType="clear" nzTheme="outline"></i>
      </button>
    </nz-button-group>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent<T extends BasicDto, S extends Search> {
  private cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) appModel!: Model<T, S>;
  @Output() appClear = new EventEmitter<void>();
  @Output() appRefresh = new EventEmitter<void>();

  loading = false;

  refresh(): void {
    this.loading = true;
    this.appRefresh.emit();
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 1000);
  }

  clear(): void {
    this.appModel.search = this.appModel.searchInit;
    this.appModel.page = 1;
    this.appClear.emit();
  }
}
