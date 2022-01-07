import { Pipe, PipeTransform } from '@angular/core';

import { AnyDto, Page } from '../types';

@Pipe({ name: 'IsPageArray' })
export class IsPageArrayPipe implements PipeTransform {
  transform(value: unknown): Array<AnyDto<Page>> {
    return value as Array<AnyDto<Page>>;
  }
}
