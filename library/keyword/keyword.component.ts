import { Component, EventEmitter, Input, Output } from '@angular/core';

import { WpxModel } from '@weplanx/ng';

@Component({
  selector: 'wpx-keyword',
  template: `
    <nz-input-group [ngStyle]="{ width: wpxWidth + 'px' }" nzSuffixIcon="search">
      <input
        nz-input
        [placeholder]="wpxPlaceholder"
        [(ngModel)]="wpxModel.searchText"
        [disabled]="!!wpxModel.advanced()"
        (keyup.enter)="submit()"
      />
    </nz-input-group>
  `
})
export class WpxKeywordComponent<T> {
  @Input({ required: true }) wpxModel!: WpxModel<T>;
  @Input({ required: true }) wpxKeys!: string[];
  @Input() wpxWidth = 220;
  @Input() wpxPlaceholder = '关键词搜索';
  @Output() wpxSubmit = new EventEmitter<void>();

  submit(): void {
    this.wpxModel.keywords = !this.wpxModel.searchText
      ? []
      : this.wpxKeys.map(key => ({
          [key]: { $regex: this.wpxModel.searchText }
        }));
    this.wpxSubmit.emit();
  }
}
