export interface Resource {
  id: number;
  pid: number;
  fragment: string;
  name: string;
  nav: boolean;
  router: boolean;
  icon: string;

  [key: string]: any;
}

export const resource: Resource[] = [
  {
    id: 1,
    pid: 0,
    fragment: 'dashboard',
    name: `{"zh_cn":"仪表盘","en_us":"Dashboard"}`,
    nav: true,
    router: false,
    icon: 'dashboard'
  },
  {
    id: 2,
    pid: 1,
    fragment: 'analysis',
    name: `{"zh_cn":"分析页","en_us":"Analysis"}`,
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 3,
    pid: 1,
    fragment: 'monitor',
    name: `{"zh_cn":"监控页","en_us":"Monitor"}`,
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 4,
    pid: 1,
    fragment: 'workbench',
    name: `{"zh_cn":"工作台","en_us":"Workbench"}`,
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 5,
    pid: 2,
    fragment: 'audience',
    name: `{"zh_cn":"受众分析","en_us":"Audience"}`,
    nav: false,
    router: true,
    icon: ''
  }
];
