export function factoryLocales(dataset: object, mapping: Map<number, string>) {
  const lang: { [key: string]: any } = {};
  for (const key in dataset) {
    if (dataset.hasOwnProperty(key)) {
      const data = dataset[key];
      for (const index in data) {
        if (data.hasOwnProperty(index)) {
          const locale = mapping.get(parseInt(index, 0));
          if (lang[locale] === undefined) {
            lang[locale] = {};
          }
          lang[locale][key] = data[index];
        }
      }
    }
  }
  return lang;
}
