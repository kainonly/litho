export interface Role {
  id: string;
  create_time: string;
  update_time: string;
  sort: number;
  status: boolean;
  name: string;
  description: string;
  strategy: RoleStrategy;
}

export interface RoleStrategy {
  navs: string[];
  routes: string[];
  caps: string[];
}
