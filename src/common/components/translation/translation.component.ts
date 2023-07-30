import { ChangeDetectionStrategy, Component, Inject, Input, LOCALE_ID } from '@angular/core';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-translation',
  template: `
    <ng-container *ngIf="!simple; else simpleRef">
      <button nzSize="large" nz-button nzType="text" nz-dropdown [nzDropdownMenu]="i18nMenu">
        <span nz-icon nzType="translation"></span>
        <span [ngSwitch]="locale">
          <ng-container *ngSwitchCase="'zh-Hans'">简体中文</ng-container>
          <ng-container *ngSwitchCase="'en-US'">English</ng-container>
        </span>
      </button>
    </ng-container>

    <ng-template #simpleRef>
      <button nz-button nzType="text" nz-dropdown [nzDropdownMenu]="i18nMenu">
        <span nz-icon nzType="translation"></span>
      </button>
    </ng-template>

    <nz-dropdown-menu #i18nMenu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item (click)="wpx.setLocale('zh-Hans')"> 简体中文 </li>
        <li nz-menu-item (click)="wpx.setLocale('en-US')"> English </li>
      </ul>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationComponent {
  @Input() simple = false;

  constructor(
    public wpx: WpxService,
    @Inject(LOCALE_ID) public locale: string
  ) {}
}
