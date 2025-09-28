import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Directive, QueryList, TemplateRef } from '@angular/core';
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
      @for (item of items; track item) {
        <ng-container *nzSpaceItem>
          <ng-container *ngTemplateOutlet="item"></ng-container>
        </ng-container>
      }
    </nz-space>
    <ng-template #splitRef>
      <nz-divider style="height: 10px" nzType="vertical"></nz-divider>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Split {
  @ContentChildren(SplitItem, { read: TemplateRef }) items!: QueryList<TemplateRef<void>>;
}
