import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  standalone: true,
  imports: [NzLayoutModule, NzGridModule, NzButtonModule, NzIconModule, NzSpaceModule, NzTypographyModule],
  selector: 'app-single-content',
  styles: `
    nz-header {
      background: #fff;
    }

    nz-content {
      background-size: 100%;
      flex: 1 1 auto;
    }

    nz-footer {
      background: #fff;
      text-align: center;
    }
  `,
  template: `
    <nz-layout style="height: 100%;overflow: hidden">
      <nz-header>
        <nz-row nzJustify="space-between" nzAlign="middle">
          <nz-col></nz-col>
          <nz-col></nz-col>
          <nz-col></nz-col>
        </nz-row>
      </nz-header>
      <nz-content>
        <ng-content></ng-content>
      </nz-content>
      <nz-footer>
        <nz-space nzDirection="vertical" nzSize="small">
          <span *nzSpaceItem nz-typography>
            Copyright <span nz-icon nzType="copyright"></span> 2025 Litho System. Designed by Kain.
          </span>
        </nz-space>
      </nz-footer>
    </nz-layout>
  `
})
export class SingleContent {}
