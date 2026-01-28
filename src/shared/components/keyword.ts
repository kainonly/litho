import { Component, input, output } from '@angular/core';
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
    <nz-input-search [style.width.px]="appWidth()" (nzSearch)="search()">
      <input nz-input [placeholder]="appPlaceholder()" [(ngModel)]="appModel().search.q" />
    </nz-input-search>
  `
})
export class Keyword<T extends Basic, S extends SearchOption> {
  appModel = input.required<Model<T, S>>();
  appWidth = input(180);
  appPlaceholder = input(`关键词搜索`);
  appOnSearch = output<string>();

  search(): void {
    this.appOnSearch.emit(this.appModel().search.q);
  }
}
