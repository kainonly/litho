import { AnyDto, Page } from '@weplanx/common';

export const nav: Array<AnyDto<Page>> = [
  {
    _id: '61ca6ada2e83bf89116a4799',
    parent: '',
    name: '商品管理',
    icon: 'shopping',
    kind: 'group',
    sort: 0,
    status: true,
    create_time: new Date('2021-12-28T01:39:38.784Z'),
    update_time: new Date('2021-12-28T01:39:38.784Z')
  },
  {
    _id: '61ca6ada2e83bf89116a479b',
    parent: '61ca6ada2e83bf89116a4799',
    name: '商品清单',
    kind: 'default',
    schema: {
      key: 'products',
      fields: {}
    },
    sort: 2,
    status: true,
    create_time: new Date('2021-12-28T01:39:38.784Z'),
    update_time: new Date('2022-01-13T02:05:08.083Z')
  },
  {
    _id: '61ca6ada2e83bf89116a479c',
    parent: '61ca6ada2e83bf89116a4799',
    name: '商品分组',
    kind: 'default',
    schema: {
      key: 'product_group',
      fields: {}
    },
    sort: 1,
    status: true,
    create_time: new Date('2021-12-28T01:39:38.784Z'),
    update_time: new Date('2021-12-31T03:27:52.381Z')
  },
  {
    _id: '61ca6ada2e83bf89116a479d',
    parent: '61ca6ada2e83bf89116a4799',
    name: '商品设置',
    kind: 'form',
    schema: {
      key: 'product_values',
      fields: {}
    },
    sort: 3,
    status: true,
    create_time: new Date('2021-12-28T01:39:38.784Z'),
    update_time: new Date('2021-12-28T01:39:38.784Z')
  },
  {
    _id: '61ca6ada2e83bf89116a479a',
    parent: '',
    name: '订单管理',
    icon: 'profile',
    kind: 'group',
    sort: 2,
    status: true,
    create_time: new Date('2021-12-28T01:39:38.784Z'),
    update_time: new Date('2021-12-28T01:39:38.784Z')
  },
  {
    _id: '61ca6ada2e83bf89116a479e',
    parent: '61ca6ada2e83bf89116a479a',
    name: '订单列表',
    kind: 'default',
    schema: {
      key: 'orders',
      fields: {}
    },
    sort: 0,
    status: true,
    create_time: new Date('2021-12-28T01:39:38.784Z'),
    update_time: new Date('2021-12-28T01:39:38.784Z')
  },
  {
    _id: '61ca6ada2e83bf89116a479f',
    parent: '61ca6ada2e83bf89116a479a',
    name: '售后维权',
    kind: 'default',
    schema: {
      key: 'after_sale_orders',
      fields: {}
    },
    sort: 0,
    status: true,
    create_time: new Date('2021-12-28T01:39:38.784Z'),
    update_time: new Date('2021-12-28T01:39:38.784Z')
  }
];
