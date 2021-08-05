import { Resource } from 'ngx-bit/router';

export const resource: Resource[] = [
  // 仪表盘
  {
    id: 1,
    pid: 0,
    fragment: 'dashboard',
    name: '仪表盘',
    nav: true,
    router: false,
    icon: 'dashboard'
  },
  {
    id: 2,
    pid: 1,
    fragment: 'analysis',
    name: '分析页',
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 3,
    pid: 1,
    fragment: 'monitor',
    name: '监控页',
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 4,
    pid: 1,
    fragment: 'workbench',
    name: '工作台',
    nav: true,
    router: true,
    icon: ''
  },
  // 表单
  {
    id: 20,
    pid: 0,
    fragment: 'form',
    name: '表单页',
    nav: true,
    router: false,
    icon: 'form'
  },
  {
    id: 21,
    pid: 20,
    fragment: 'basic',
    name: '基础表单',
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 22,
    pid: 20,
    fragment: 'step',
    name: '分步表单',
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 23,
    pid: 20,
    fragment: 'advanced',
    name: '高级表单',
    nav: true,
    router: true,
    icon: ''
  },
  // 列表页
  {
    id: 40,
    pid: 0,
    fragment: 'list',
    name: '列表页',
    nav: true,
    router: false,
    icon: 'table'
  },
  {
    id: 41,
    pid: 40,
    fragment: 'table',
    name: '查询表格',
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 42,
    pid: 40,
    fragment: 'basic',
    name: '标准列表',
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 43,
    pid: 40,
    fragment: 'card',
    name: '卡片列表',
    nav: true,
    router: true,
    icon: ''
  },
  // 详情页
  {
    id: 60,
    pid: 0,
    fragment: 'profile',
    name: '详情页',
    nav: true,
    router: false,
    icon: 'profile'
  },
  {
    id: 61,
    pid: 60,
    fragment: 'basic',
    name: '基础详情页',
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 62,
    pid: 60,
    fragment: 'advanced',
    name: '高级详情页',
    nav: true,
    router: true,
    icon: ''
  },
  // 结果页
  {
    id: 80,
    pid: 0,
    fragment: 'result',
    name: '结果页',
    nav: true,
    router: false,
    icon: 'check-circle'
  },
  {
    id: 81,
    pid: 80,
    fragment: 'success',
    name: '成功页',
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 82,
    pid: 80,
    fragment: 'fail',
    name: '失败页',
    nav: true,
    router: true,
    icon: ''
  },
  // 异常页
  {
    id: 100,
    pid: 0,
    fragment: 'exception',
    name: '异常页',
    nav: true,
    router: false,
    icon: 'warning'
  },
  {
    id: 101,
    pid: 100,
    fragment: '403',
    name: '403',
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 102,
    pid: 100,
    fragment: '404',
    name: '404',
    nav: true,
    router: true,
    icon: ''
  },
  {
    id: 103,
    pid: 100,
    fragment: '500',
    name: '500',
    nav: true,
    router: true,
    icon: ''
  }
];
