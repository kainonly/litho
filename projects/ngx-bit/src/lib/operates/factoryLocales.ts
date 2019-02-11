export function factoryLocales(packer: any): any {
  const source = {
    zh_cn: {},
    en_us: {}
  };
  for (const i in packer) {
    if (packer.hasOwnProperty(i)) {
      source.zh_cn[i] = packer[i][0];
      source.en_us[i] = packer[i][1];
    }
  }
  return source;
}
