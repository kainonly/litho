import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BasicDto, Search } from '@common';
import { Model } from '@common/utils/model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule, NzButtonModule, NzIconModule, NzSpaceModule],
  selector: 'app-keyword',
  template: `
    <nz-input-group [style.width.px]="appWidth" nzSearch [nzAddOnAfter]="suffixRef">
      <input nz-input [placeholder]="appPlaceholder" [(ngModel)]="appModel.search.q" (keyup.enter)="search()" />
    </nz-input-group>
    <ng-template #suffixRef>
      <button nz-button nzSearch nzType="primary" (click)="search()">
        <span nz-icon nzType="search"></span>
      </button>
    </ng-template>
  `
})
export class KeywordComponent<T extends BasicDto, S extends Search> {
  @Input({ required: true }) appModel!: Model<T, S>;
  @Input() appWidth = 240;
  @Input() appPlaceholder = `Search`;
  @Output() appOnSearch = new EventEmitter<string>();

  search(): void {
    this.appOnSearch.emit(this.appModel.search.q);
  }
}
