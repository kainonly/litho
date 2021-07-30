import { Resource } from '@common/types';

export const resource: Resource[] = [
  // 仪表盘
  {
    id: 1,
    pid: 0,
    fragment: 'dashboard',
    name: {
      zh_cn: '仪表盘',
      en_us: 'Dashboard'
    },
    nav: true,
    router: false,
    icon: 'dashboard'
  },
  {
    id: 2,
    pid: 1,
    fragment: 'analysis',
    name: {
      zh_cn: '分析页',
      en_us: 'Analysis'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 3,
    pid: 1,
    fragment: 'monitor',
    name: {
      zh_cn: '监控页',
      en_us: 'Monitor'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 4,
    pid: 1,
    fragment: 'workbench',
    name: {
      zh_cn: '工作台',
      en_us: 'Workbench'
    },
    nav: true,
    router: true,
    icon: ''
  },
  // 表单
  {
    id: 20,
    pid: 0,
    fragment: 'form',
    name: {
      zh_cn: '表单页',
      en_us: 'Form'
    },
    nav: true,
    router: false,
    icon: 'form'
  },
  {
    id: 21,
    pid: 20,
    fragment: 'basic',
    name: {
      zh_cn: '基础表单',
      en_us: 'Basic Form'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 22,
    pid: 20,
    fragment: 'step',
    name: {
      zh_cn: '分步表单',
      en_us: 'Step Form'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 23,
    pid: 20,
    fragment: 'advanced',
    name: {
      zh_cn: '高级表单',
      en_us: 'Advanced Form'
    },
    nav: true,
    router: true,
    icon: ''
  },
  // 列表页
  {
    id: 40,
    pid: 0,
    fragment: 'list',
    name: {
      zh_cn: '列表页',
      en_us: 'List'
    },
    nav: true,
    router: false,
    icon: 'table'
  },
  {
    id: 41,
    pid: 40,
    fragment: 'search',
    name: {
      zh_cn: '搜索列表',
      en_us: 'Search'
    },
    nav: true,
    router: false,
    icon: ''
  },
  {
    id: 42,
    pid: 41,
    fragment: 'articles',
    name: {
      zh_cn: '搜索列表（文章）',
      en_us: 'Search (Articles)'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 43,
    pid: 41,
    fragment: 'projects',
    name: {
      zh_cn: '搜索列表（项目）',
      en_us: 'Search (Projects)'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 44,
    pid: 41,
    fragment: 'applications',
    name: {
      zh_cn: '搜索列表（应用）',
      en_us: 'Search (Applications)'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 45,
    pid: 40,
    fragment: 'table',
    name: {
      zh_cn: '查询表格',
      en_us: 'Table'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 46,
    pid: 40,
    fragment: 'basic',
    name: {
      zh_cn: '标准列表',
      en_us: 'Basic'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 47,
    pid: 40,
    fragment: 'card',
    name: {
      zh_cn: '卡片列表',
      en_us: 'Card'
    },
    nav: true,
    router: true,
    icon: ''
  },
  // 详情页
  {
    id: 60,
    pid: 0,
    fragment: 'profile',
    name: {
      zh_cn: '详情页',
      en_us: 'Profile'
    },
    nav: true,
    router: false,
    icon: 'profile'
  },
  {
    id: 61,
    pid: 60,
    fragment: 'basic',
    name: {
      zh_cn: '基础详情页',
      en_us: 'Basic'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 62,
    pid: 60,
    fragment: 'advanced',
    name: {
      zh_cn: '高级详情页',
      en_us: 'Advanced'
    },
    nav: true,
    router: true,
    icon: ''
  },
  // 结果页
  {
    id: 80,
    pid: 0,
    fragment: 'result',
    name: {
      zh_cn: '结果页',
      en_us: 'Result'
    },
    nav: true,
    router: false,
    icon: 'check-circle'
  },
  {
    id: 81,
    pid: 80,
    fragment: 'success',
    name: {
      zh_cn: '成功页',
      en_us: 'Success'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 82,
    pid: 80,
    fragment: 'fail',
    name: {
      zh_cn: '失败页',
      en_us: 'Fail'
    },
    nav: true,
    router: true,
    icon: ''
  },
  // 异常页
  {
    id: 100,
    pid: 0,
    fragment: 'exception',
    name: {
      zh_cn: '异常页',
      en_us: 'Exception'
    },
    nav: true,
    router: false,
    icon: 'warning'
  },
  {
    id: 101,
    pid: 100,
    fragment: '403',
    name: {
      zh_cn: '403',
      en_us: '403'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 102,
    pid: 100,
    fragment: '404',
    name: {
      zh_cn: '404',
      en_us: '404'
    },
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 103,
    pid: 100,
    fragment: '500',
    name: {
      zh_cn: '500',
      en_us: '500'
    },
    nav: true,
    router: true,
    icon: ''
  }
];
