import { Menu } from './menu';

export interface Layout {
  navs: string[];
  nav_menus: Record<string, Menu[]>;
}
