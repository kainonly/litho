import { Component } from '@angular/core';

@Component({
  selector: 'wpx-toolbox',
  template: `
    <nz-button-group>
      <button nz-button nzType="text" nz-tooltip="高级检索">
        <span nz-icon nzType="filter" nzTheme="outline"></span>
      </button>
      <button nz-button nzType="text" nz-tooltip="重置条件">
        <span nz-icon nzType="clear" nzTheme="outline"></span>
      </button>
      <button nz-button nzType="text" nz-tooltip="刷新数据">
        <span nz-icon nzType="reload" nzTheme="outline"></span>
      </button>
    </nz-button-group>
  `
})
export class WpxToolboxComponent {}
