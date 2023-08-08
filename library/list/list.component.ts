import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';

import { AnyDto, WpxModel } from '@weplanx/ng';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'wpx-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxListComponent<T> {
  @Input({ required: true }) wpxModel!: WpxModel<T>;
  @Input({ required: true }) wpxTitle!: TemplateRef<void>;
  @Input({ required: true }) wpxExtra!: TemplateRef<void>;
  @Input({ required: true }) wpxRender!: TemplateRef<{ $implicit: AnyDto<T> }>;
  @Input() wpxOffset = 0;
  @Input() wpxActions?: NzDropdownMenuComponent;

  @Output() wpxChange = new EventEmitter<void>();

  actived?: AnyDto<T>;

  constructor(
    private contextMenu: NzContextMenuService,
    private cdr: ChangeDetectorRef
  ) {}

  clearSelections(): void {
    this.wpxModel.checked = false;
    this.wpxModel.indeterminate = false;
    this.wpxModel.selection.clear();
    this.cdr.detectChanges();
  }

  openActions($event: MouseEvent, data: AnyDto<T>): void {
    if (this.wpxActions) {
      this.actived = data;
      this.contextMenu.create($event, this.wpxActions);
    }
  }
}
