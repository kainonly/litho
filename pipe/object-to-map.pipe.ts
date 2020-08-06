import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ObjectToMap' })
export class ObjectToMapPipe implements PipeTransform {
  transform(value: any): Map<any, any> | boolean {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const mapList: Map<any, any> = new Map();
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          mapList.set(key, value[key]);
        }
      }
      return mapList;
    } else {
      return false;
    }
  }
}
