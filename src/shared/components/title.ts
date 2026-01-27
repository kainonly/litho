import { Component, input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  standalone: true,
  imports: [NzIconModule, NzTooltipModule],
  selector: 'app-title',
  template: `
    <b>
      <ng-content></ng-content>
      @if (appInfo()) {
        <nz-icon style="margin-left: 0.25rem" nzType="info-circle" [nz-tooltip]="appInfo()"></nz-icon>
      }
    </b>
    @if (appKeyword()) {
      <nz-icon style="margin-left: 0.25rem" nzType="tag" nz-tooltip="关键词"></nz-icon>
    }
  `
})
export class Title {
  appKeyword = input(false);
  appInfo = input<string>();
}
