import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Global, SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-system-views',
  template: `
    <div class="litho-split-container">
      <div class="litho-split-list-panel" style="width: 200px; overflow: hidden auto">
        <ul style="border: none; height: 100%" nz-menu nzMode="inline">
          @for (nav of global.navs; track nav.key) {
            <li nz-menu-item nzMatchRouter>
              <a [routerLink]="['/system', 'access', 'views', nav.link]">
                <nz-icon [nzType]="nav.icon" />
                {{ nav.name }}
              </a>
            </li>
          }
        </ul>
      </div>

      <div class="litho-split-detail-panel">
        <router-outlet />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Views {
  global = inject(Global);
}
