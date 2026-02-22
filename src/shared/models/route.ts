export interface Route {
  id: string;
  menu_id: string;
  nav: string;
  created_at: string;
  updated_at: string;
  sort: number;
  active: boolean;
  pid: string;
  name: string;
  type: number;
  icon: string;
  link: string;
}

export interface RegroupUpdate {
  changed: boolean;
  id: string;
  pid: string;
}
