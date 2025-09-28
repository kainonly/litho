import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { Model } from '@shared';
import { Basic, SearchOption } from '@shared/models';

@Component({
  standalone: true,
  imports: [FormsModule, NzInputModule, NzButtonModule, NzIconModule, NzSpaceModule],
  selector: 'app-keyword',
  template: `
    <nz-input-group nzSearch [style.width.px]="360" [nzAddOnAfter]="suffixRef">
      <input nz-input [placeholder]="appPlaceholder" [(ngModel)]="appModel.search.q" (keyup.enter)="search()" />
    </nz-input-group>
    <ng-template #suffixRef>
      <button nz-button nzSearch (click)="search()">
        <nz-icon nzType="search" />
      </button>
    </ng-template>
  `
})
export class Keyword<T extends Basic, S extends SearchOption> {
  @Input({ required: true }) appModel!: Model<T, S>;
  @Input() appPlaceholder = `Search`;
  @Output() appOnSearch = new EventEmitter<string>();

  search(): void {
    this.appOnSearch.emit(this.appModel.search.q);
  }
}
