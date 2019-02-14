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
  // factory({zh_cn: "基础服务", en_us: "Base"}, "experiment", 1, '', [
  //   factory({zh_cn: "ConfigService", en_us: "ConfigService"}, "", 1, 'base-config'),
  //   factory({zh_cn: "BitService", en_us: "BitService"}, "", 1, 'base-bit'),
  //   factory({zh_cn: "HttpService", en_us: "HttpService"}, "", 1, 'base-http'),
  //   factory({zh_cn: "EventsService", en_us: "EventsService"}, "", 1, 'base-events')
  // ]),
  // factory({zh_cn: "公共服务", en_us: "Common"}, "build", 1, '', [
  //   factory({zh_cn: "SwalService", en_us: "SwalService"}, "", 1, 'common-swal'),
  // ]),
  // factory({zh_cn: "CURD", en_us: "CURD"}, "thunderbolt", 1, '', [
  //   factory({zh_cn: "AddService", en_us: "AddService"}, "", 1, 'curd-add'),
  //   factory({zh_cn: "DeleteService", en_us: "DeleteService"}, "", 1, 'curd-delete'),
  //   factory({zh_cn: "EditService", en_us: "EditService"}, "", 1, 'curd-edit'),
  //   factory({zh_cn: "GetService", en_us: "GetService"}, "", 1, 'curd-get'),
  //   factory({zh_cn: "ListsService", en_us: "ListsService"}, "", 1, 'curd-lists'),
  //   factory({zh_cn: "OriginListsService", en_us: "OriginListsService"}, "", 1, 'curd-originlists'),
  //   factory({zh_cn: "StatusService", en_us: "StatusService"}, "", 1, 'curd-status')
  // ]),
  // factory({zh_cn: "管道", en_us: "Pipe"}, "bulb", 1, '', [
  //   factory({zh_cn: "Defined", en_us: "Defined"}, "", 1, 'pipe-defined'),
  //   factory({zh_cn: "Undefined", en_us: "Undefined"}, "", 1, 'pipe-undefined'),
  //   factory({zh_cn: "EmptyArray", en_us: "EmptyArray"}, "", 1, 'pipe-emptyarray'),
  //   factory({zh_cn: "EmptyObject", en_us: "EmptyObject"}, "", 1, 'pipe-emptyobject'),
  //   factory({zh_cn: "ObjectToArray", en_us: "ObjectToArray"}, "", 1, 'pipe-objecttoarray'),
  //   factory({zh_cn: "ObjectToMap", en_us: "ObjectToMap"}, "", 1, 'pipe-objecttomap'),
  //   factory({zh_cn: "JsonParse", en_us: "JsonParse"}, "", 1, 'pipe-jsonparse'),
  //   factory({zh_cn: "JsonChose", en_us: "JsonChose"}, "", 1, 'pipe-jsonchose'),
  // ]),
  // factory({zh_cn: "操作库", en_us: "Operate"}, "tool", 1, '', [
  //   factory({zh_cn: "asyncValidator", en_us: "asyncValidator"}, "", 1, 'operate-asyncvalidator'),
  //   factory({zh_cn: "i18nControlsValue", en_us: "i18nControlsValue"}, "", 1, 'operate-i18ncontrolsvalue'),
  //   factory({zh_cn: "i18nControlsValidate", en_us: "i18nControlsValidate"}, "", 1, 'operate-i18ncontrolsvalidate'),
  //   factory({
  //     zh_cn: "i18nControlsAsyncValidate",
  //     en_us: "i18nControlsAsyncValidate"
  //   }, "", 1, 'operate-i18ncontrolsasyncvalidate'),
  //   factory({zh_cn: "factoryLocales", en_us: "factoryLocales"}, "", 1, 'operate-factorylocales'),
  //   factory({zh_cn: "getRouteName", en_us: "getRouteName"}, "", 1, 'operate-getroutename'),
  //   factory({zh_cn: "emptyArray", en_us: "emptyArray"}, "", 1, 'operate-emptyarray'),
  //   factory({zh_cn: "emptyObject", en_us: "emptyObject"}, "", 1, 'operate-emptyobject'),
  //   factory({zh_cn: "objectToArray", en_us: "objectToArray"}, "", 1, 'operate-objecttoarray'),
  //   factory({zh_cn: "objectToMap", en_us: "objectToMap"}, "", 1, 'operate-objecttomap'),
  // ]),
  // factory({zh_cn: "组件", en_us: "Component"}, "api", 1, '', [
  //   factory({zh_cn: "表单", en_us: "Form"}, "", 1, 'component-form'),
  //   factory({zh_cn: "表格", en_us: "Table"}, "", 1, 'component-table'),
  //   factory({zh_cn: "上传", en_us: "Upload"}, "", 1, 'component-upload'),
  //   factory({zh_cn: "语言包", en_us: "Language"}, "", 1, 'component-language'),
  //   factory({zh_cn: "多语言", en_us: "I18n"}, "", 1, 'component-i18n'),
  // ]),
];
convert(source, '0');
fs.writeFileSync('./src/assets/api/menu.json', JSON.stringify({
  error: 0,
  data: lists
}));


