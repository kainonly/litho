export const aclData = [
  {
    id: 1,
    key: 'main',
    name: '{"zh_cn":"公共模块","en_us":"Common Module"}',
    write: 'uploads',
    read: null,
    status: 1,
    create_time: 1579512965,
    update_time: 1579512965
  },
  {
    id: 2,
    key: 'resource',
    name: '{"zh_cn":"资源控制模块","en_us":"Resource Module"}',
    write: 'add,edit,delete,sort',
    read: 'get,originLists,lists',
    status: 1,
    create_time: 1579512965,
    update_time: 1585994768
  },
  {
    id: 3,
    key: 'acl',
    name: '{"zh_cn":"访问控制模块","en_us":"Acl Module"}',
    write: 'add,edit,delete',
    read: 'originLists,lists,get',
    status: 1,
    create_time: 1579512965,
    update_time: 1579512965
  },
  {
    id: 4,
    key: 'policy',
    name: '{"zh_cn":"策略模块","en_us":"Policy Module"}',
    write: 'add,delete',
    read: 'originLists',
    status: 1,
    create_time: 1579512965,
    update_time: 1579512965
  },
  {
    id: 5,
    key: 'admin',
    name: '{"zh_cn":"管理员模块","en_us":"Admin Module"}',
    write: 'add,edit,delete',
    read: 'originLists,lists,get',
    status: 1,
    create_time: 1579512965,
    update_time: 1579512965
  },
  {
    id: 6,
    key: 'role',
    name: '{"zh_cn":"权限组模块","en_us":"Role Module"}',
    write: 'add,edit,delete',
    read: 'originLists,lists,get',
    status: 1,
    create_time: 1579512965,
    update_time: 1579512965
  }
];

export const resourceData = [
  {
    key: 'system',
    parent: 'origin',
    name: '{"zh_cn":"系统设置","en_us":"System"}',
    nav: 1,
    router: 0,
    policy: 0,
    icon: 'setting'
  },
  {
    key: 'acl-index',
    parent: 'system',
    name: '{"zh_cn":"访问控制管理","en_us":"Acl"}',
    nav: 1,
    router: 1,
    policy: 1,
    icon: null
  },
  {
    key: 'acl-add',
    parent: 'acl-index',
    name: '{"zh_cn":"访问控制新增","en_us":"Acl Add"}',
    nav: 0,
    router: 1,
    policy: 0,
    icon: null
  },
  {
    key: 'acl-edit',
    parent: 'acl-index',
    name: '{"zh_cn":"访问控制修改","en_us":"Acl Edit"}',
    nav: 0,
    router: 1,
    policy: 0,
    icon: null
  },
  {
    key: 'resource-index',
    parent: 'system',
    name: '{"zh_cn":"资源控制管理","en_us":"Resource"}',
    nav: 1,
    router: 1,
    policy: 1,
    icon: null
  },
  {
    key: 'resource-add',
    parent: 'resource-index',
    name: '{"zh_cn":"资源控制新增","en_us":"Resource Add"}',
    nav: 0,
    router: 1,
    policy: 0,
    icon: null
  },
  {
    key: 'resource-edit',
    parent: 'resource-index',
    name: '{"zh_cn":"资源控制修改","en_us":"Resource Edit"}',
    nav: 0,
    router: 1,
    policy: 0,
    icon: null
  },
  {
    key: 'example-index',
    parent: 'system',
    name: '{"zh_cn":"测试主页","en_us":"Example"}',
    nav: 1,
    router: 1,
    policy: 1,
    icon: null
  },
  {
    key: 'example-add',
    parent: 'example-index',
    name: '{"zh_cn":"测试新增页","en_us":"Example Add"}',
    nav: 0,
    router: 1,
    policy: 0,
    icon: null
  },
  {
    key: 'example-edit',
    parent: 'example-index',
    name: '{"zh_cn":"测试修改页","en_us":"Example Edit"}',
    nav: 0,
    router: 1,
    policy: 0,
    icon: null
  },
  {
    key: 'example-opt',
    parent: 'example-index',
    name: '{"zh_cn":"测试设置页","en_us":"Example Option"}',
    nav: 0,
    router: 1,
    policy: 0,
    icon: null
  }
];
