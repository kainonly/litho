export interface Role {
  id: string;
  org_id: string;
  created_at: string;
  updated_at: string;
  sort: number;
  active: boolean;
  name: string;
  description: string;
  strategy: RoleStrategy;
}

export interface RoleStrategy {
  navs: string[];
  routes: string[];
  caps: string[];
}
