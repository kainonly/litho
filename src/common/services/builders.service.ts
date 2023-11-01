import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Builder } from '@common/models/builder';
import { AnyDto, Filter, WpxApi, XFilter } from '@weplanx/ng';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Injectable({ providedIn: 'root' })
export class BuildersService extends WpxApi<Builder> {
  protected override collection = 'builders';
  dict: Record<string, AnyDto<Builder>> = {};

  getNzTreeNodeOptions(
    pipe: (val: AnyDto<Builder>) => NzTreeNodeOptions,
    filter: Filter<Builder> = {},
    xfilter?: XFilter
  ): Observable<NzTreeNodeOptions[]> {
    return this.find(filter, { sort: { sort: 1 }, xfilter }).pipe(
      map(({ data }) => {
        const nodes: NzTreeNodeOptions[] = [];
        const nodeDict: Record<string, NzTreeNodeOptions> = {};
        data.forEach(v => {
          this.dict[v._id] = v;
          nodeDict[v._id] = pipe(v);
        });
        data.forEach(v => {
          const options = nodeDict[v._id];
          if (!v.parent) {
            nodes.push(options);
          } else {
            if (nodeDict[v.parent]) {
              if (!nodeDict[v.parent]['children']) {
                nodeDict[v.parent].children = [];
              }
              nodeDict[v.parent].children?.push(options);
              nodeDict[v.parent].isLeaf = false;
            }
          }
        });
        return nodes;
      })
    );
  }
}
