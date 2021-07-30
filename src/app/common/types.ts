export interface Resource {
  id: number;
  pid: number;
  fragment: string;
  name: Record<string, string>;
  nav: boolean;
  router: boolean;
  icon: string;

  [key: string]: any;
}

export interface Resources {
  navs: Resource[];
  dict: Record<string, Resource>;
  paths: Record<string, number>;
}
