import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { Global, SharedModule } from '@shared';
import { Menu, Layout as LayoutModel, Nav } from '@shared/models';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-layout',
  styleUrl: `./layout.less`,
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout implements OnInit {
  readonly appNav = input<string>('');

  global = inject(Global);

  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  navs = signal<Nav[]>([]);
  navMenus = signal<Record<string, Menu[]>>({});

  ngOnInit(): void {
    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      if (!data['layout']) {
        return;
      }
      const { navs, nav_menus } = data['layout'] as LayoutModel;
      const exists = new Set(navs);
      this.navs.set(this.global.navs.filter(v => exists.has(v.key)));
      this.navMenus.set(nav_menus);
    });
  }

  logout(): void {
    this.global.logout().subscribe(() => {
      // this.global.activeUser.set(null);
      this.router.navigateByUrl('/login');
    });
  }
}
