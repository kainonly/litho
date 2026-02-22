import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  standalone: true,
  imports: [CommonModule, NzIconModule, NzTooltipModule],
  selector: 'app-title',
  template: `
    <span [ngStyle]="{ 'font-weight': appBold() ? 'bold' : 'normal' }">
      <ng-content></ng-content>
      @if (appInfo()) {
        <nz-icon style="margin-left: 0.25rem" nzType="info-circle" [nz-tooltip]="appInfo()"></nz-icon>
      }
    </span>
    @if (appKeyword()) {
      <nz-icon style="margin-left: 0.25rem" nzType="tag" nz-tooltip="关键词"></nz-icon>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Title {
  appBold = input(true);
  appInfo = input<string>();
  appKeyword = input(false);
}
