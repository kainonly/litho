const uuidv4 = require('uuid/v4');
const fs = require('fs');

function factory(name, icon, nav, routerlink, children) {
  const data = {
    id: uuidv4(),
    name: name,
    icon: icon,
    nav: nav,
    routerlink: routerlink
  };
  if (children) data['children'] = children;
  return data;
}

function convert(dataset, parent) {
  for (const x of dataset) {
    const data = {
      id: x.id,
      parent: parent,
      name: JSON.stringify(x.name),
      icon: x.icon,
      nav: x.nav,
      routerlink: x.routerlink
    };
    lists.push(data);
    if (x.children) convert(x.children, x.id);
  }
}

const lists = [];
const source = [
  factory({zh_cn: "基础服务", en_us: "Base"}, "", 1, '', [
    factory({zh_cn: "ConfigService", en_us: "ConfigService"}, "", 1, '/base-config'),
    factory({zh_cn: "BitService", en_us: "BitService"}, "", 1, '/base-bit'),
    factory({zh_cn: "HttpService", en_us: "HttpService"}, "", 1, '/base-http'),
    factory({zh_cn: "EventsService", en_us: "EventsService"}, "", 1, '/base-events')
  ]),
  factory({zh_cn: "公共服务", en_us: "Common"}, "", 1, '', [
    factory({zh_cn: "SwalService", en_us: "SwalService"}, "", 1, '/common-swal'),
  ]),
  factory({zh_cn: "CURD", en_us: "CURD"}, "", 1, '', [
    factory({zh_cn: "AddService", en_us: "AddService"}, "", 1, '/curd-add'),
    factory({zh_cn: "DeleteService", en_us: "DeleteService"}, "", 1, '/curd-delete'),
    factory({zh_cn: "EditService", en_us: "EditService"}, "", 1, '/curd-edit'),
    factory({zh_cn: "GetService", en_us: "GetService"}, "", 1, '/curd-get'),
    factory({zh_cn: "ListsService", en_us: "ListsService"}, "", 1, '/curd-lists'),
    factory({zh_cn: "OriginListsService", en_us: "OriginListsService"}, "", 1, '/curd-originlists'),
    factory({zh_cn: "StatusService", en_us: "StatusService"}, "", 1, '/curd-status')
  ]),
  factory({zh_cn: "管道", en_us: "Pipe"}, "", 1, '', []),
  factory({zh_cn: "组件", en_us: "Component"}, "", 1, '', []),
  factory({zh_cn: "操作库", en_us: "Operate"}, "", 1, '', []),
];
convert(source, '0');
fs.writeFileSync('./src/assets/api/menu.json', JSON.stringify(lists));


