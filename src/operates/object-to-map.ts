export function objectToMap(object: any): Map<any, any> | boolean {
  if (object !== null && typeof object === 'object' && !Array.isArray(object)) {
    const mapList: Map<any, any> = new Map();
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        mapList.set(key, object[key]);
      }
    }
    return mapList;
  } else {
    return false;
  }
}
