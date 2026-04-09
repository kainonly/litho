export interface Route {
  id: string;
  create_time: string;
  update_time: string;
  sort: number;
  status: boolean;
  nav: string;
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
