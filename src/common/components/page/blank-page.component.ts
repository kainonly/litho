import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blank-page',
  template: `
    <nz-layout style="height: 100%">
      <nz-header>
        <nz-row nzJustify="space-between" nzAlign="middle">
          <nz-col>
            <button nz-button nzType="text" (click)="star()">
              <span nz-icon nzType="github" nzTheme="outline"></span>
              Star
            </button>
          </nz-col>
          <nz-col> </nz-col>
          <nz-col> </nz-col>
        </nz-row>
      </nz-header>
      <nz-content>
        <ng-content></ng-content>
      </nz-content>
      <nz-footer>
        <nz-space nzDirection="vertical" nzSize="small">
          <ng-container *nzSpaceItem>
            <span nz-typography>BSD-3-Clause License</span>
          </ng-container>
          <ng-container *nzSpaceItem>
            <span nz-typography>
              Copyright <span nz-icon nzType="copyright" nzTheme="outline"></span> 2023. Open Source DevOps by WEPLANX.
            </span>
          </ng-container>
        </nz-space>
      </nz-footer>
    </nz-layout>
  `,
  styles: [
    `
      nz-header {
        background: #fff;
      }

      nz-content {
        background-size: 100%;
        background: #fff url('https://cdn.kainonly.com/assets/bg.svg') no-repeat center;
        flex: 1 1 auto;
      }

      nz-footer {
        background: #fff;
        text-align: center;
      }
    `
  ]
})
export class BlankPageComponent {
  constructor(private platform: Platform) {}

  star(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    window.open('https://github.com/weplanx', '_blank');
  }
}
