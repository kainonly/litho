import { CommonModule } from '@angular/common';
import { Component, contentChildren, Directive, TemplateRef } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Directive({
  selector: '[appSplitItem]'
})
export class SplitItem {}

@Component({
  standalone: true,
  imports: [CommonModule, NzSpaceModule, NzDividerModule],
  selector: 'app-split',
  template: `
    <nz-space [nzSize]="0" [nzSplit]="splitRef" nzAlign="center">
      @for (item of items(); track item) {
        <ng-container *nzSpaceItem>
          <ng-container *ngTemplateOutlet="item"></ng-container>
        </ng-container>
      }
    </nz-space>
    <ng-template #splitRef>
      <nz-divider style="height: 10px" nzType="vertical"></nz-divider>
    </ng-template>
  `
})
export class Split {
  items = contentChildren(SplitItem, { read: TemplateRef });
}
